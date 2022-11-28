import React, { FC, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { deleteColumn, getAllColumns, updateColumn } from '../../../../api/columnApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  decreaseColumnCount,
  setColumns,
  setCurrentColumnId,
  toggleColumn,
  toggleModal,
  toggleTask,
} from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import PopUp from './PopUp/PopUp';
import TasksPreview from './TasksPreview';

const Board: FC = () => {
  const column = useAppSelector((store) => store.board.value);
  const tasks = useAppSelector((store) => store.board.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllColumns());
  }, [dispatch]);

  const onDragEndColumnHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination?.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const col = Array.from(column);
    const [reorderedItem] = col.splice(source.index, 1);
    col.splice(destination.index, 0, reorderedItem);
    dispatch(setColumns(col));
    for (let i = 0; i < column.length; i++) {
      dispatch(updateColumn({ title: col[i].title, order: i, id: col[i]._id }));
    }
  };

  const onDragEndTaskHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination?.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    // Moving tasks in one column

    if (start === finish) {
      const task = Array.from(tasks[start]);
      const [reorderedItem] = task.splice(source.index, 1);
      task.splice(destination.index, 0, reorderedItem);
      return;
    }

    // Moving tasks in different column

    const startTaskIds = Array.from(tasks[start]);
    const [reorderedItem] = startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(tasks[finish]);
    finishTaskIds.splice(destination.index, 0, reorderedItem);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEndColumnHandler}>
        <Droppable droppableId="column" direction="horizontal">
          {(provided) => (
            <div className={styles.wrapper} ref={provided.innerRef} {...provided.droppableProps}>
              {column.map((column, index) => (
                <Draggable key={column._id} draggableId={column._id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      draggable={true}
                    >
                      <div className={styles.column}>
                        <div className={styles.headingWrapper}>
                          <h2 className={styles.titleColumn}>{column.title}</h2>
                          <button
                            className={styles.delete}
                            onClick={() => {
                              dispatch(deleteColumn({ id: column._id }));
                              dispatch(decreaseColumnCount());
                              dispatch(getAllColumns());
                            }}
                          ></button>
                        </div>
                        <DragDropContext onDragEnd={onDragEndTaskHandler}>
                          <Droppable droppableId={column._id}>
                            {(provided) => (
                              <div
                                className={styles.tasksWrapper}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                <TasksPreview _id={column._id} />
                                <button
                                  className={styles.addButton}
                                  onClick={() => {
                                    dispatch(setCurrentColumnId(column._id));
                                    dispatch(toggleModal());
                                    dispatch(toggleTask());
                                  }}
                                ></button>
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
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
