import React, { FC } from 'react';
import styles from './Header.module.css';
import { switchEng, switchRu } from '../../store/reducers/languageReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import textData from '../../data/textData';
import home from '../../assets/img/icons/home_image.jpg';
import signIn from '../../assets/img/icons/sing_in.jpg';
import signUp from '../../assets/img/icons/sign_up.jpg';
import edit from '../../assets/img/icons/edit.png';
import exit from '../../assets/img/icons/exit.png';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../store/slices/sliceAuth';

const Header: FC = () => {
  const language = useAppSelector((store) => store.language.value);
  const token = useAppSelector((store) => store.authReducer.token);
  const dispatch = useAppDispatch();

  const switchCheck = () => {
    if (language === 'eng') {
      dispatch(switchRu());
    } else {
      dispatch(switchEng());
    }
  };

  const onClick = () => {
    localStorage.removeItem('token');
    dispatch(logOut());
  };

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.leftBlock}>
        <h1 className={styles.heading}>Doska</h1>
        <NavLink className={styles.home} to="/" end>
          <img src={home} alt="home" className={styles.homeImage} />
          <p className={styles.homeText}>{textData.header.home[language]}</p>
        </NavLink>
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
  );
};

export default Header;
