import React, { FC } from 'react';
import styles from './Header.module.css';

const Header: FC = () => {
  return (
    <header>
      <div className={styles.leftBlock}>
        <h1 className={styles.heading}>Doska</h1>
        <div className={styles.home}>
          <img src="" alt="" className={styles.homeImage} />
          <p className={styles.homeText}>Home</p>
        </div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.language}>
          <button className={styles.languageSwitch}></button>
          <div className={styles.languageText}>
            <p className={styles.languageRus}>Русский</p>
            <p className={styles.languageEng}>English</p>
          </div>
        </div>
        <div className={styles.signIn}>
          <img src="" alt="" className={styles.signInImage} />
          <p className={styles.signInText}>Sign In</p>
        </div>
        <div className={styles.signUp}>
          <img src="" alt="" className={styles.signUpImage} />
          <p className={styles.signUpText}>Sign Up</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
