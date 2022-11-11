import React, { FC } from 'react';
import Team from './Team/Team';
import styles from './Welcome.module.css';
import cards from '../../../../assets/cards.png';
import D from '../../../../assets/letterD.png';
import K from '../../../../assets/letterK.png';

const Welcome: FC = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.textWrapper}>
        <p className={styles.text}>
          Everyone can handle our application, just register and get started
        </p>
      </div>
      <img src={cards} alt="cards" className={styles.cards} />
      <div className={styles.teamWrapper}>
        <div className={styles.team}>
          <Team />
        </div>
        <p className={styles.teamText}>Our Team</p>
      </div>
      <img src={D} alt="D" className={styles.letterD} />
      <img src={K} alt="K" className={styles.letterK} />
    </div>
  );
};

export default Welcome;
