import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { toggleColumn, toggleModal, toggleTask } from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import PopUp from './PopUp/PopUp';

const Board: FC = () => {
  const board = useAppSelector((store) => store.board.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.wrapper}>
        {board.map((column, columnIndex) => (
          <div key={`${columnIndex}-${column}`} className={styles.column}>
            <div className={styles.headingWrapper}>
              <h2 className={styles.titleColumn}>{column.description}</h2>
              <button className={styles.delete}></button>
            </div>
            <div className={styles.tasksWrapper}>
              {column.column.map((task, taskIndex) => (
                <div
                  key={`${taskIndex}-${task}`}
                  style={{ backgroundColor: task.color }}
                  className={styles.task}
                >
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
