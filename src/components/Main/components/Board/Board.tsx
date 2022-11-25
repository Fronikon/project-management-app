import React, { FC, useEffect } from 'react';
import { deleteColumn, getAllColumns } from '../../../../api/columnApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
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

  return (
    <>
      <div className={styles.wrapper}>
        {column.map((column) => (
          <div key={column._id} className={styles.column} draggable={true}>
            <div className={styles.headingWrapper}>
              <h2 className={styles.titleColumn}>{column.title}</h2>
              <button
                className={styles.delete}
                onClick={() => {
                  dispatch(deleteColumn({ id: column._id }));
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
        ))}
        <button
          className={styles.addButton}
          onClick={() => {
            dispatch(toggleModal());
            dispatch(toggleColumn());
          }}
        ></button>
      </div>
      <PopUp />
    </>
  );
};

export default Board;
