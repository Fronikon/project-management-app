import React, { FC } from 'react';
import styles from '../../../../components/Main/components/PageNotFound/PageNotFound.module.css';
import fone from '../../../../assets/404.png';

const PageNotFound: FC = () => {
  const title = {
    ru: 'К сожалению такой страницы не существует',
    en: 'Sorry, there is no such page',
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.letterD}>D</span>
      <h2 className={styles.title}>{title.en}</h2>
      <img className={styles.image} src={fone} alt="Error 404" />
    </div>
  );
};

export default PageNotFound;
