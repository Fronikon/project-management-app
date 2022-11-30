import React, { FC } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { updateColumn } from '../../../../api/columnApi';
import { updateTasks } from '../../../../api/taskApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  setColumns,
  setTasks,
  toggleColumn,
  toggleModal,
} from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import Column from './Column';
import PopUp from './PopUp/PopUp';

const Board: FC = () => {
  const column = useAppSelector((store) => store.boardReducer.value);
  const tasks = useAppSelector((store) => store.boardReducer.tasks);
  const dispatch = useAppDispatch();

  const onDragEndColumnHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination?.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Moving columns

    if (source.droppableId === 'column') {
      const col = Array.from(column);
      const [reorderedItem] = col.splice(source.index, 1);
      col.splice(destination.index, 0, reorderedItem);
      dispatch(setColumns(col));
      for (let i = 0; i < column.length; i++) {
        dispatch(updateColumn({ title: col[i].title, order: i, id: col[i]._id }));
      }

      // Moving tasks
    } else {
      const start = source.droppableId;
      const finish = destination.droppableId;

      // Moving tasks in one column

      if (start === finish) {
        const task = Array.from(tasks[start]);
        const [reorderedItem] = task.splice(source.index, 1);
        task.splice(destination.index, 0, reorderedItem);
        dispatch(setTasks({ items: task, id: start }));
        for (let i = 0; i < task.length; i++) {
          dispatch(
            updateTasks({
              title: task[i].title,
              order: i,
              description: task[i].description,
              color: task[i].color,
              columnId: start,
              userId: task[i].userId,
              users: task[i].users,
              _id: task[i]._id,
            })
          );
        }
        return;
      }

      // Moving tasks in different column

      const startTaskIds = Array.from(tasks[start]);
      const [reorderedItem] = startTaskIds.splice(source.index, 1);

      let finishTaskIds = [];

      // Checking if destination column has tasks or undefiend

      if (tasks[finish] === undefined) {
        finishTaskIds = [reorderedItem];
      } else {
        finishTaskIds = Array.from(tasks[finish]);
        finishTaskIds.splice(destination.index, 0, reorderedItem);
      }

      dispatch(setTasks({ items: startTaskIds, id: start }));
      dispatch(setTasks({ items: finishTaskIds, id: finish }));

      for (let i = 0; i < startTaskIds.length; i++) {
        dispatch(
          updateTasks({
            title: startTaskIds[i].title,
            order: i,
            description: startTaskIds[i].description,
            color: startTaskIds[i].color,
            columnId: start,
            userId: startTaskIds[i].userId,
            users: startTaskIds[i].users,
            _id: startTaskIds[i]._id,
          })
        );
      }

      for (let i = 0; i < finishTaskIds.length; i++) {
        dispatch(
          updateTasks({
            title: finishTaskIds[i].title,
            order: i,
            description: finishTaskIds[i].description,
            color: finishTaskIds[i].color,
            columnId: finish,
            userId: finishTaskIds[i].userId,
            users: finishTaskIds[i].users,
            _id: finishTaskIds[i]._id,
          })
        );
      }
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEndColumnHandler}>
        <Droppable droppableId="column" direction="horizontal" type="column">
          {(provided) => (
            <div className={styles.wrapper} ref={provided.innerRef} {...provided.droppableProps}>
              <Column />
              <button
                className={styles.addButton}
                onClick={() => {
                  dispatch(toggleModal());
                  dispatch(toggleColumn());
                }}
              ></button>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <PopUp />
    </>
  );
};

export default Board;
