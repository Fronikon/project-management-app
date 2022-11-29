import React, { FC, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { deleteColumn, getAllColumns } from '../../../../api/columnApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  decreaseColumnCount,
  setCurrentColumnId,
  toggleModal,
  toggleTask,
} from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import TasksPreview from './TasksPreview';

const Column: FC = () => {
  const column = useAppSelector((store) => store.board.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllColumns());
  }, [dispatch]);

  return (
    <>
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
                <Droppable droppableId={column._id} type="task">
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
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default Column;
