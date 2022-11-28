import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { switchEng, switchRu } from '../../store/reducers/languageReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import textData from '../../data/textData';
import home from '../../assets/img/icons/home_image.jpg';
import boards from '../../assets/img/icons/boards-logo.png';
import addBoard from '../../assets/img/icons/add-board-logo.png';
import signIn from '../../assets/img/icons/sing_in.jpg';
import signUp from '../../assets/img/icons/sign_up.jpg';
import edit from '../../assets/img/icons/edit.png';
import exit from '../../assets/img/icons/exit.png';
import { logOut } from '../../store/slices/sliceAuth';
import Modal from '../../componentsUtils/Modal/Modal';
import ConfirmAction from '../../componentsUtils/forms/ConfirmActionForm/ConfirmActionForm';
import CreateBoardForm from './../../componentsUtils/forms/CreateBoardForm/CreateBoardForm';
import useToken from '../../hooks/useToken';

const Header: FC = () => {
  const language = useAppSelector((store) => store.language.value);
  const token = useToken();
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = useState(false);

  const switchCheck = () => {
    if (language === 'eng') {
      dispatch(switchRu());
    } else {
      dispatch(switchEng());
    }
  };

  const closeModalLogOut = () => {
    setIsModal(false);
  };

  const onClick = () => {
    setIsModal(true);
  };

  const confirm = () => {
    setIsModal(false);
    localStorage.removeItem('token');
    dispatch(logOut());
  };

  const cancel = () => {
    setIsModal(false);
  };

  const [isOpenCreateBoardModal, setIsOpenCreateBoardModal] = useState(false);

  const closeModal = () => {
    setIsOpenCreateBoardModal(false);
  };

  const openModal = () => {
    setIsOpenCreateBoardModal(true);
  };

  const renderCreateBoardModal = () => {
    if (isOpenCreateBoardModal) {
      return (
        <Modal closeModal={closeModal}>
          <CreateBoardForm closeModal={closeModal} />
        </Modal>
      );
    }
  };

  return (
    <>
      {isModal && (
        <Modal closeModal={closeModalLogOut}>
          <ConfirmAction
            question={textData.boardsPage.questionConfirmingDeleteBoard[language]}
            confirm={confirm}
            cancel={cancel}
          />
        </Modal>
      )}
      <header className={styles.headerWrapper}>
        <div className={styles.leftBlock}>
          <h1 className={styles.heading}>Doska</h1>
          <div className={styles.buttons}>
            <NavLink className={styles.home} to={'/'}>
              <img src={home} alt="home" className={styles.homeImg} />
              <p className={styles.homeText}>{textData.header.home[language]}</p>
            </NavLink>
            {token && (
              <>
                <NavLink className={styles.board} to={'boards'}>
                  <img src={boards} alt="boards" className={styles.boardsImg} />
                  <p className={styles.boardText}>{textData.header.boards[language]}</p>
                </NavLink>
                <button onClick={openModal} className={styles.addBoard}>
                  <img src={addBoard} alt="add board" className={styles.addBoardImg} />
                  <p className={styles.addBoardText}>{textData.header.addBoard[language]}</p>
                </button>
              </>
            )}
          </div>
          {renderCreateBoardModal()}
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.language}>
            <label className={styles.switch}>
              <input type="checkbox" onClick={switchCheck} />
              <span
                className={`${styles.slider} ${language === 'eng' && styles.sliderEng} ${
                  language === 'ru' && styles.sliderRu
                }  ${styles.round}`}
              ></span>
            </label>
            <div className={styles.languageText}>
              <p className={`${styles.languageRus} ${language === 'ru' && styles.activeLanguage}`}>
                Русский
              </p>
              <p className={`${styles.languageEng} ${language === 'eng' && styles.activeLanguage}`}>
                English
              </p>
            </div>
          </div>
          {token ? (
            <div className={styles.auth}>
              <NavLink className={styles.signIn} to="/edit" end>
                <img src={edit} alt="Edit profile." className={styles.signInImage} />
                <p className={styles.signInText}>{textData.header.edit[language]}</p>
              </NavLink>
              <div className={styles.signUp} onClick={onClick}>
                <img src={exit} alt="Exit." className={styles.signUpImage} />
                <p className={styles.signUpText}>{textData.header.exit[language]}</p>
              </div>
            </div>
          ) : (
            <div className={styles.auth}>
              <NavLink className={styles.signIn} to="/signIn" end>
                <img src={signIn} alt="Sign In." className={styles.signInImage} />
                <p className={styles.signInText}>{textData.header.signIn[language]}</p>
              </NavLink>
              <NavLink className={styles.signUp} to="/signUp" end>
                <img src={signUp} alt="Sign Up." className={styles.signUpImage} />
                <p className={styles.signUpText}>{textData.header.signUp[language]}</p>
              </NavLink>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
