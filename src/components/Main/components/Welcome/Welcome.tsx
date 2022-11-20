import React, { FC } from 'react';
import styles from './Welcome.module.css';
import cards from '../../../../assets/img/other/cards.png';
import D from '../../../../assets/img/other/letterD.png';
import K from '../../../../assets/img/other/letterK.png';
import Team from './Team/Team';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import textData from '../../../../data/textData';
import { Link } from 'react-router-dom';

const Welcome: FC = () => {
  const language = useAppSelector((store) => store.language.value);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.textWrapper}>
        <p className={styles.text}>{textData.welcomePage.textWrapper[language]}</p>
        <div className={styles.linkWrapper}>
          <Link to="/signIn">{textData.authPage.signIn[language]}</Link>
          <Link to="/signUp">{textData.authPage.registration[language]}</Link>
        </div>
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
