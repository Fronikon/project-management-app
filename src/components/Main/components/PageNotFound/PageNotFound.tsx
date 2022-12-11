import React, { FC } from 'react';
import styles from './PageNotFound.module.css';
import fone from '../../../../assets/img/other/404.png';
import textData from '../../../../data/textData';
import { useAppSelector } from '../../../../hooks/reduxHooks';

const PageNotFound: FC = () => {
  const language = useAppSelector((store) => store.language.value);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{textData.pageNotFound[language]}</h2>
      <img className={styles.image} src={fone} alt="Error 404." />
    </div>
  );
};

export default PageNotFound;
