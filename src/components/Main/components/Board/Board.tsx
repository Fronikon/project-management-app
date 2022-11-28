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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllColumns());
  }, [dispatch]);

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId } = result;

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

  return (
    <>
      <DragDropContext onDragEnd={onDragEndHandler}>
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
                        <div className={styles.tasksWrapper}>
                          <TasksPreview _id={column._id} />
                          <button
                            className={styles.addButton}
                            onClick={() => {
                              dispatch(setCurrentColumnId(column._id));
                              dispatch(toggleModal());
                              dispatch(toggleTask());
                            }}
                          ></button>
                        </div>
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
