import React, { FC } from 'react';
import Team from './Team/Team';
import styles from './Welcome.module.css';

const Welcome: FC = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.textWrapper}>
        <p className={styles.text}>
          Everyone can handle our application, just register and get started
        </p>
      </div>
      <div className={styles.teamWrapper}>
        <div className={styles.team}>
          <Team />
        </div>
        <p className={styles.teamText}>Our Team</p>
      </div>
    </div>
  );
};

export default Welcome;
