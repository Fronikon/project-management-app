import React, { FC } from 'react';
import styles from './Welcome.module.css';
import cards from '../../../../assets/cards.png';
import D from '../../../../assets/letterD.png';
import K from '../../../../assets/letterK.png';
import Team from './Team/Team';

const Welcome: FC = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.textWrapper}>
        <p className={styles.text}>
          We will help you organize your work with the help of task board management tools. To do
          this, register or sign in to your account
        </p>
      </div>
      <img src={cards} alt="cards" className={styles.cards} />
      <div className={styles.teamWrapper}>
        <ul className={styles.team}>
          <Team />
        </ul>
        <p className={styles.teamText}>Our Team</p>
      </div>
      <img src={D} alt="D" className={styles.letterD} />
      <img src={K} alt="K" className={styles.letterK} />
    </div>
  );
};

export default Welcome;
