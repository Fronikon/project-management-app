import React, { FC } from 'react';
import styles from './Welcome.module.css';
import cards from '../../../../assets/img/other/cards.png';
import D from '../../../../assets/img/other/letterD.png';
import K from '../../../../assets/img/other/letterK.png';
import Team from './Team/Team';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import textData from '../../../../data/textData';
import { Link } from 'react-router-dom';
import useToken from '../../../../hooks/useToken';

const Welcome: FC = () => {
  const token = useToken();
  const language = useAppSelector((store) => store.language.value);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.textWrapper}>
        <p className={styles.text}>{textData.welcomePage.textWrapper[language]}</p>
        {token ? (
          <div className={styles.linkWrapper}>
            <Link className={styles.linkSignIn} to="/boards">
              {textData.header.start[language]}
            </Link>
          </div>
        ) : (
          <div className={styles.linkWrapper}>
            <Link className={styles.linkSignIn} to="/signIn">
              {textData.header.signIn[language]}
            </Link>
            <Link className={styles.linkSignUp} to="/signUp">
              {textData.header.signUp[language]}
            </Link>
          </div>
        )}
      </div>
      <img src={cards} alt="cards" className={styles.cards} />
      <div className={styles.teamWrapper}>
        <ul className={styles.team}>
          <Team />
        </ul>
        <p className={styles.teamText}>{textData.welcomePage.team[language]}</p>
      </div>
      <img src={D} alt="D" className={styles.letterD} />
      <img src={K} alt="K" className={styles.letterK} />
    </div>
  );
};

export default Welcome;
