import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { toggleColumn, toggleModal } from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import PopUp from './PopUp/PopUp';

const Board: FC = () => {
  const board = useAppSelector((store) => store.board.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.wrapper}>
        {board.map((column) => (
          <div key={'1'} className={styles.column}>
            <div className={styles.headingWrapper}>
              <h2 className={styles.title}>{column.description}</h2>
              <button className={styles.delete}></button>
            </div>
            <div className={styles.tasksWrapper}>
              {column.column.map((task) => (
                <div key={'2'} style={{ backgroundColor: task.color }} className={styles.task}>
                  <div className={styles.titleWrapper}>
                    <h3 className={styles.title}>{task.title}</h3>
                    <button className={styles.delete}></button>
                  </div>
                  <p className={styles.descriptionTask}>{task.description}</p>
                </div>
              ))}
              <button className={styles.addButton}></button>
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
