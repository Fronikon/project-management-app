import React, { FC, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  decreaseColumnCount,
  deleteColumnTAC,
  getAllColumnsTAC,
  setCurrentColumnId,
  setOrder,
  setTitle,
  toggleColumnChange,
  toggleModal,
  toggleTask,
} from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import TasksPreview from './TasksPreview';

const Column: FC = () => {
  const column = useAppSelector((store) => store.boardReducer.columns);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllColumnsTAC({ boardId: id as string }));
  }, [dispatch, id]);

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
                  <h2
                    className={styles.titleColumn}
                    onClick={() => {
                      dispatch(setCurrentColumnId(column._id));
                      dispatch(setTitle(column.title));
                      dispatch(setOrder(column.order));
                      dispatch(toggleModal());
                      dispatch(toggleColumnChange());
                    }}
                  >
                    {column.title}
                  </h2>
                  <button
                    className={styles.delete}
                    onClick={() => {
                      dispatch(decreaseColumnCount());
                      dispatch(deleteColumnTAC({ id: column._id, boardId: id as string }));
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
                      {provided.placeholder}
                      <button
                        className={styles.addButton}
                        onClick={() => {
                          dispatch(setCurrentColumnId(column._id));
                          dispatch(toggleModal());
                          dispatch(toggleTask());
                        }}
                      ></button>
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
