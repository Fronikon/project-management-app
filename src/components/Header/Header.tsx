import React, { FC, useState } from 'react';
import styles from './Header.module.css';
import home from '../../assets/home_image.jpg';
import signIn from '../../assets/sing_in.jpg';
import signUp from '../../assets/sign_up.jpg';
import { switchEng, switchRu } from '../../store/reducers/languageReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import textData from '../../types/textData';

const Header: FC = () => {
  const language = useAppSelector((store) => store.language.value);
  const dispatch = useAppDispatch();

  const switchCheck = () => {
    if (language === 'eng') {
      dispatch(switchRu());
    } else {
      dispatch(switchEng());
    }
  };
  // {
  //   textData.header.home[language];
  // }
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.leftBlock}>
        <h1 className={styles.heading}>Doska</h1>
        <button className={styles.home}>
          <img src={home} alt="home" className={styles.homeImage} />
          <p className={styles.homeText}>{textData.header.home[language]}</p>
        </button>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.language}>
          <label className={styles.switch} onClick={switchCheck}>
            <input type="checkbox" />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <div className={styles.languageText}>
            <p className={styles.languageRus}>Русский</p>
            <p className={styles.languageEng}>English</p>
          </div>
        </div>
        <button className={styles.signIn}>
          <img src={signIn} alt="signIn" className={styles.signInImage} />
          <p className={styles.signInText}>Sign In</p>
        </button>
        <button className={styles.signUp}>
          <img src={signUp} alt="signUp" className={styles.signUpImage} />
          <p className={styles.signUpText}>Sign Up</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
