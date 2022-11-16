import React, { FC } from 'react';
import textData from '../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import styles from './Board.module.css';

const Board: FC = () => {
  const board = useAppSelector((store) => store.board.value);
  const isModalOpen = useAppSelector((store) => store.board.isModalOpen);
  const isColumnModalOpen = useAppSelector((store) => store.board.isColumnModalOpen);
  const isTaskModalOpen = useAppSelector((store) => store.board.isTaskModalOpen);
  const isChangeModalOpen = useAppSelector((store) => store.board.isChangeModalOpen);
  const language = useAppSelector((store) => store.language.value);
  const dispatch = useAppDispatch();

  return (
    <>
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
        <button className={styles.addColumnButton}></button>
      </div>
      {isModalOpen && (
        <div className={styles.popup}>
          {isColumnModalOpen && (
            <div className={styles.newColumnModal}>
              <h2 className={styles.modalHeading}>{textData.boardsPage.newColumn[language]}</h2>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>{textData.boardsPage.title[language]}</legend>
                <input type="text" placeholder="Placeholder" className={styles.input} />
              </fieldset>
              <div className={styles.btnsWrapper}>
                <button className={styles.confirm}>{textData.general.confirm[language]}</button>
                <button className={styles.cancel}>{textData.general.cancel[language]}</button>
              </div>
            </div>
          )}
          {isTaskModalOpen && (
            <div className={styles.newTaskModal}>
              <h2 className={styles.modalHeading}>{textData.boardsPage.newTask[language]}</h2>
              <div className={styles.modalInputsWrapper}>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>{textData.boardsPage.title[language]}</legend>
                  <input type="text" placeholder="Placeholder" className={styles.input} />
                </fieldset>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    {textData.boardsPage.description[language]}
                  </legend>
                  <input type="text" placeholder="Placeholder" className={styles.input} />
                </fieldset>
                <div className={`${styles.colorWrapper} ${styles.input}`}>
                  <div className={styles.colorTextWrapper}>
                    <p className={styles.colorText}>{textData.boardsPage.taskColor[language]}</p>
                  </div>
                  <input type="color" className={styles.color} />
                </div>
              </div>
              <div className={styles.btnsWrapper}>
                <button className={styles.confirm}>{textData.general.confirm[language]}</button>
                <button className={styles.cancel}>{textData.general.cancel[language]}</button>
              </div>
            </div>
          )}
          {isChangeModalOpen && (
            <div className={styles.newChangeModal}>
              <h2 className={styles.modalHeading}>{textData.boardsPage.changeTask[language]}</h2>
              <div className={styles.modalInputsWrapper}>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>{textData.boardsPage.title[language]}</legend>
                  <input type="text" placeholder="Placeholder" className={styles.input} />
                </fieldset>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    {textData.boardsPage.description[language]}
                  </legend>
                  <input type="text" placeholder="Placeholder" className={styles.input} />
                </fieldset>
                <div className={`${styles.colorWrapper} ${styles.input}`}>
                  <div className={styles.colorTextWrapper}>
                    <p className={styles.colorText}>{textData.boardsPage.taskColor[language]}</p>
                  </div>
                  <input type="color" className={styles.color} />
                </div>
              </div>
              <div className={styles.btnsWrapper}>
                <button className={styles.confirm}>{textData.general.confirm[language]}</button>
                <button className={styles.cancel}>{textData.general.cancel[language]}</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Board;
