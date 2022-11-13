import React, { FC } from 'react';
import styles from './PageNotFound.module.css';
import fone from '../../../../assets/404.png';
import letterD from '../../../../assets/letterD.png';

const title = {
  ru: 'К сожалению такой страницы не существует',
  en: 'Sorry, there is no such page',
};

const PageNotFound: FC = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.letterD} src={letterD} alt="Letter D." />
      <h2 className={styles.title}>{title.ru}</h2>
      <img className={styles.image} src={fone} alt="Error 404." />
    </div>
  );
};

export default PageNotFound;
