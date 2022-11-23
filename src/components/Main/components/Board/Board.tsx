import React, { FC, useEffect } from 'react';
import { deleteColumn, getAllColumns } from '../../../../api/columnApi';
import { getColumnTasks } from '../../../../api/taskApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  setCurrentColumnId,
  toggleColumn,
  toggleModal,
  toggleTask,
} from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import PopUp from './PopUp/PopUp';

const Board: FC = () => {
  const board = useAppSelector((store) => store.board.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllColumns());
    for (let i = 0; i < board.length; i++) {
      dispatch(getColumnTasks({ _id: board[i]._id }));
    }
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        {board.map((column) => (
          <div key={column._id} className={styles.column}>
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
              {column.tasks?.map((task) => (
                <div key={task._id} style={{ backgroundColor: task.color }} className={styles.task}>
                  <div className={styles.titleWrapper}>
                    <h3 className={styles.titleTask}>{task.title}</h3>
                    <button className={`${styles.delete} ${styles.deleteTask}`}></button>
                  </div>
                  <p className={styles.descriptionTask}>{task.description}</p>
                </div>
              ))}
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
