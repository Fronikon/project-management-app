import React, { FC } from 'react';
import styles from './Loader.module.css';

const Loader: FC = () => {
  return (
    <section className={styles.loader}>
      <div className={styles.loaderWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.firstBlock}></div>
          <div className={styles.secondBlock}></div>
        </div>
        <div className={styles.middleColumn}></div>
        <div className={styles.rightColumn}></div>
      </div>
    </section>
  );
};

export default Loader;
