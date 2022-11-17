import React, { FC, useState } from 'react';
import textData from '../../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import { addColumn, toggleColumn, toggleModal } from '../../../../../store/reducers/boardReducer';
import styles from './PopUp.module.css';

const PopUp: FC = () => {
  const [title, setTitle] = useState('');
  const isModalOpen = useAppSelector((store) => store.board.isModalOpen);
  const isColumnModalOpen = useAppSelector((store) => store.board.isColumnModalOpen);
  const isTaskModalOpen = useAppSelector((store) => store.board.isTaskModalOpen);
  const isChangeModalOpen = useAppSelector((store) => store.board.isChangeModalOpen);
  const language = useAppSelector((store) => store.language.value);
  const dispatch = useAppDispatch();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const columnHandler = () => {
    dispatch(
      addColumn({
        description: title,
        column: [],
      })
    );
    dispatch(toggleColumn());
    dispatch(toggleModal());
    setTitle('');
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.popup}>
          {isColumnModalOpen && (
            <div className={styles.newColumnModal}>
              <h2 className={styles.modalHeading}>{textData.boardsPage.newColumn[language]}</h2>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>{textData.boardsPage.title[language]}</legend>
                <input
                  type="text"
                  placeholder="Placeholder"
                  onChange={inputHandler}
                  className={styles.input}
                />
              </fieldset>
              <div className={styles.btnsWrapper}>
                <button onClick={columnHandler} className={styles.confirm}>
                  {textData.general.confirm[language]}
                </button>
                <button
                  className={styles.cancel}
                  onClick={() => {
                    dispatch(toggleColumn());
                    dispatch(toggleModal());
                    setTitle('');
                  }}
                >
                  {textData.general.cancel[language]}
                </button>
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

export default PopUp;
