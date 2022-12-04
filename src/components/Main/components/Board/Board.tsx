import React, { FC } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  setColumns,
  setTasks,
  TaskType,
  toggleColumn,
  toggleModal,
  updateColumnTAC,
  updateTaskTAC,
} from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import Column from './Column';
import PopUp from './PopUp/PopUp';

const Board: FC = () => {
  const column = useAppSelector((store) => store.boardReducer.columns);
  const tasks = useAppSelector((store) => store.boardReducer.tasks);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const updateSpecialTasksOrder = (tasks: TaskType[], columnId: string) => {
    for (let i = 0; i < tasks.length; i++) {
      const taskData = {
        title: tasks[i].title,
        order: i,
        description: tasks[i].description,
        color: tasks[i].color,
        columnId: columnId,
        userId: tasks[i].userId,
        users: tasks[i].users,
        boardId: id as string,
        _id: tasks[i]._id,
      };

      dispatch(updateTaskTAC({ taskData }));
    }
  };

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
        const columnData = {
          title: col[i].title,
          order: i,
        };
        dispatch(updateColumnTAC({ columnData, boardId: id as string, id: col[i]._id }));
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
          const taskData = {
            title: task[i].title,
            order: i,
            description: task[i].description,
            color: task[i].color,
            columnId: start,
            userId: task[i].userId,
            users: task[i].users,
            boardId: id as string,
            _id: task[i]._id,
          };

          dispatch(updateTaskTAC({ taskData }));
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

      updateSpecialTasksOrder(startTaskIds, start);

      updateSpecialTasksOrder(finishTaskIds, finish);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEndColumnHandler}>
        <Droppable droppableId="column" direction="horizontal" type="column">
          {(provided) => (
            <div className={styles.wrapper} ref={provided.innerRef} {...provided.droppableProps}>
              <Column />
              {provided.placeholder}
              <button
                className={styles.addButton}
                onClick={() => {
                  dispatch(toggleModal());
                  dispatch(toggleColumn());
                }}
              ></button>
              <NavLink
                className={styles.back}
                to={'/boards'}
                style={{ borderBottom: '2px dashed black' }}
              ></NavLink>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <PopUp />
    </>
  );
};

export default Board;
