import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CreateBoardForm from '../../../../componentsUtils/forms/CreateBoardForm/CreateBoardForm';
import Modal from '../../../../componentsUtils/Modal/Modal';
import textData from '../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import useToken from '../../../../hooks/useToken';
import { switchEng, switchRu } from '../../../../store/reducers/languageReducer';
import { logOut } from '../../../../store/slices/sliceAuth';
import styles from './Burger.module.css';

const Burger = () => {
  const language = useAppSelector((store) => store.language.value);
  const token = useToken();
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const [isOpenCreateBoardModal, setIsOpenCreateBoardModal] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', function () {
      if (headerRef.current) {
        if (window.pageYOffset > 0) {
          headerRef.current.classList.add(styles.isSticky);
        } else {
          headerRef.current.classList.remove(styles.isSticky);
        }
      }
    });
  }, []);

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
    dispatch(logOut());
    navigate('/');
  };

  const cancel = () => {
    setIsModal(false);
  };

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

  useEffect(() => {
    document.addEventListener('click', function (e: MouseEvent): void {
      if (active && e.target !== burgerRef.current) setActive(false);
    });
  }, []);

  return (
    <>
      <div
        className={active ? `${styles.burgerIcon} ${styles.burgerIconActive}` : styles.burgerIcon}
        onClick={() => {
          setActive(!active);
        }}
      >
        <span
          className={active ? `${styles.burgerSpan} ${styles.burgerSpanNone}` : styles.burgerSpan}
        />
      </div>
      {renderCreateBoardModal()}

      <ul
        className={active ? `${styles.burgerList} ${styles.active}` : styles.burgerList}
        onClick={() => setActive(false)}
        ref={burgerRef}
      >
        <li className={styles.burgerItem}>
          <NavLink className={styles.burgerHome} to={'/'}>
            <p className={styles.burgerHomeText}>{textData.header.home[language]}</p>
          </NavLink>
        </li>
        {token && (
          <>
            <li className={styles.burgerItem}>
              <NavLink className={styles.burgerBoard} to={'boards'}>
                <p className={styles.burgerBoardText}>{textData.header.boards[language]}</p>
              </NavLink>
            </li>
            <li className={styles.burgerItem}>
              <div className={styles.burgerAddBoard} onClick={openModal}>
                <p className={styles.burgerAddBoardText}>{textData.header.addBoard[language]}</p>
              </div>
            </li>
          </>
        )}
        {token ? (
          <>
            <li className={styles.burgerItem}>
              <NavLink className={styles.burgerSignIn} to="/edit" end>
                <p className={styles.burgerSignInText}>{textData.header.edit[language]}</p>
              </NavLink>
            </li>
            <li className={styles.burgerItem}>
              <div className={styles.burgerSignUp} onClick={onClick}>
                <p className={styles.burgerSignUpText}>{textData.header.exit[language]}</p>
              </div>
            </li>
          </>
        ) : (
          <>
            <li className={styles.burgerItem}>
              <NavLink className={styles.burgerSignIn} to="/signIn" end>
                <p className={styles.burgerSignInText}>{textData.header.signIn[language]}</p>
              </NavLink>
            </li>
            <li className={styles.burgerItem}>
              <NavLink className={styles.burgerSignUp} to="/signUp" end>
                <p className={styles.burgerSignUpText}>{textData.header.signUp[language]}</p>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Burger;
