import React, { FC, useState } from 'react';
import textData from '../../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import {
  addColumn,
  addTask,
  toggleColumn,
  toggleModal,
  toggleTask,
} from '../../../../../store/reducers/boardReducer';
import styles from './PopUp.module.css';

const PopUp: FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');

  const isModalOpen = useAppSelector((store) => store.board.isModalOpen);
  const isColumnModalOpen = useAppSelector((store) => store.board.isColumnModalOpen);
  const isTaskModalOpen = useAppSelector((store) => store.board.isTaskModalOpen);
  const isChangeModalOpen = useAppSelector((store) => store.board.isChangeModalOpen);
  const language = useAppSelector((store) => store.language.value);
  const dispatch = useAppDispatch();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    console.log(color);
  };

  const columnConfirm = () => {
    dispatch(
      // addColumn({
      //   description: title,
      //   column: [],
      // })
      addColumn({
        description: title,
        column: [
          {
            title: 'Nandemo',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            color: '#7fffd4',
          },
          {
            title: 'Nandemo',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            color: '#7fffd4',
          },
          {
            title: 'Nandemo',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            color: '#7fffd4',
          },
        ],
      })
    );
    dispatch(toggleColumn());
    dispatch(toggleModal());
    setTitle('');
  };

  const columnCancel = () => {
    dispatch(toggleColumn());
    dispatch(toggleModal());
    setTitle('');
  };

  const taskConfirm = () => {
    dispatch(
      addTask({
        title: title,
        description: description,
        color: color,
      })
    );
    dispatch(toggleTask());
    dispatch(toggleModal());
    setTitle('');
    setDescription('');
    setColor('#000000');
  };

  const taskCancel = () => {
    dispatch(toggleTask());
    dispatch(toggleModal());
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
                  onChange={inputHandler}
                  className={styles.input}
                />
              </fieldset>
              <div className={styles.btnsWrapper}>
                <button onClick={columnConfirm} className={styles.confirm}>
                  {textData.general.confirm[language]}
                </button>
                <button className={styles.cancel} onClick={columnCancel}>
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
                  <input type="color" className={styles.color} onChange={colorHandler} />
                </div>
              </div>
              <div className={styles.btnsWrapper}>
                <button className={styles.confirm} onClick={taskConfirm}>
                  {textData.general.confirm[language]}
                </button>
                <button className={styles.cancel} onClick={taskCancel}>
                  {textData.general.cancel[language]}
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
