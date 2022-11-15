import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import styles from './Board.module.css';

const Board: FC = () => {
  const board = useAppSelector((store) => store.board.value);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      {board.map((column) => (
        <div key={'1'} className={styles.column}>
          <h2 className={styles.title}>{column.description}</h2>
          <div className={styles.tasksWrapper}>
            {column.column.map((task) => (
              <div key={'2'} style={{ backgroundColor: task.color }} className={styles.task}>
                <div className={styles.titleWrapper}>
                  <h3 className={styles.title}>{task.title}</h3>
                  <button className={styles.deleteBtn}></button>
                </div>
                <p className={styles.descriptionTask}>{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
