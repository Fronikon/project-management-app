import React, { FC, useState } from 'react';
import { createColumn, getAllColumns } from '../../../../../api/columnApi';
import { createTask, parsedToken } from '../../../../../api/taskApi';
import textData from '../../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import {
  increaseColumnCount,
  resetColumnId,
  toggleColumn,
  toggleModal,
  toggleTask,
} from '../../../../../store/reducers/boardReducer';
import styles from './PopUp.module.css';

const PopUp: FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');

  const isModalOpen = useAppSelector((store) => store.boardReducer.isModalOpen);
  const isColumnModalOpen = useAppSelector((store) => store.boardReducer.isColumnModalOpen);
  const isTaskModalOpen = useAppSelector((store) => store.boardReducer.isTaskModalOpen);
  const isChangeModalOpen = useAppSelector((store) => store.boardReducer.isChangeModalOpen);
  const language = useAppSelector((store) => store.language.value);
  const columnId = useAppSelector((store) => store.boardReducer.columnId);
  const columnLength = useAppSelector((store) => store.boardReducer.columnLength);
  const dispatch = useAppDispatch();

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const columnConfirm = () => {
    dispatch(createColumn({ title: title, order: columnLength }));
    dispatch(toggleColumn());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    setTitle('');
    dispatch(increaseColumnCount());
  };

  const columnCancel = () => {
    dispatch(toggleColumn());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    setTitle('');
  };

  const taskConfirm = () => {
    dispatch(
      createTask({
        title: title,
        order: 1,
        boardId: '6371414f2821a7b9af9f0090',
        columnId: columnId,
        description: description,
        color: color,
        userId: parsedToken.id,
        users: [parsedToken.id],
      })
    );
    dispatch(toggleTask());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    setTitle('');
    setDescription('');
    setColor('#000000');
  };

  const taskCancel = () => {
    dispatch(toggleTask());
    dispatch(toggleModal());
    dispatch(resetColumnId());
    setTitle('');
    setDescription('');
    setColor('#000000');
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
                  onChange={titleHandler}
                  className={styles.input}
                />
              </fieldset>
              <div className={styles.btnsWrapper}>
                <button onClick={columnConfirm} className={styles.confirm}>
                  {textData.general.confirmModal.confirmButton[language]}
                </button>
                <button className={styles.cancel} onClick={columnCancel}>
                  {textData.general.confirmModal.cancelButton[language]}
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
                  <input
                    type="text"
                    placeholder="Placeholder"
                    className={styles.input}
                    onChange={titleHandler}
                  />
                </fieldset>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    {textData.boardsPage.description[language]}
                  </legend>
                  <input
                    type="text"
                    placeholder="Placeholder"
                    className={styles.input}
                    onChange={descriptionHandler}
                  />
                </fieldset>
                <div className={`${styles.colorWrapper} ${styles.input}`}>
                  <div className={styles.colorTextWrapper}>
                    <p className={styles.colorText}>{textData.boardsPage.taskColor[language]}</p>
                  </div>
                  <input type="color" className={styles.color} onChange={colorHandler} />
                </div>
              </div>
              <div className={styles.btnsWrapper}>
                <button className={styles.confirm} onClick={taskConfirm}>
                  {textData.general.confirmModal.confirmButton[language]}
                </button>
                <button className={styles.cancel} onClick={taskCancel}>
                  {textData.general.confirmModal.cancelButton[language]}
                </button>
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
                <button className={styles.confirm}>
                  {textData.general.confirmModal.confirmButton[language]}
                </button>
                <button className={styles.cancel}>
                  {textData.general.confirmModal.cancelButton[language]}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PopUp;
