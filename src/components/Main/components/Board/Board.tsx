import React, { FC, useEffect } from 'react';
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
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const Board: FC = () => {
  const column = useAppSelector((store) => store.board.value);
  const dispatch = useAppDispatch();

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(column);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setColumns(items));
    for (let i = 0; i < column.length; i++) {
      dispatch(updateColumn({ title: items[i].title, order: i, id: items[i]._id }));
    }
  };

  useEffect(() => {
    dispatch(getAllColumns());
  }, [dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="columns">
            {(provided) => (
              <ul
                className={styles.wrapperList}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {column.map((column, id) => (
                  <Draggable key={column._id} draggableId={column._id} index={id}>
                    {(provided) => (
                      <li
                        className={styles.column}
                        draggable={true}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className={styles.headingWrapper}>
                          <h2 className={styles.titleColumn}>{column.title}</h2>
                          <button
                            className={styles.delete}
                            onClick={() => {
                              dispatch(deleteColumn({ id: column._id }));
                              dispatch(getAllColumns());
                              dispatch(decreaseColumnCount());
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
                      </li>
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
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <PopUp />
    </>
  );
};

export default Board;
