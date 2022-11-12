import React, { FC } from 'react';
import styles from './Footer.module.css';
import rss from '../../assets/rss-logo.png';
import textData from '../../types/textData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

const Footer: FC = () => {
  const language = useAppSelector((store) => store.language.value);
  const dispatch = useAppDispatch();

  return (
    <footer className={styles.footerWrapper}>
      <a href="https://rs.school/react/" className={styles.logoLink}>
        <img src={rss} alt="RssLogo" className={styles.logo} />
      </a>
      <div className={styles.github}>
        <a href="https://github.com/Fronikon" className={styles.githubLink}>
          {textData.footer.Dmitry[language]}
        </a>
        <a href="https://github.com/InnokentyKedrov" className={styles.githubLink}>
          {textData.footer.Andrey[language]}
        </a>
        <a href="https://github.com/karap9s" className={styles.githubLink}>
          {textData.footer.Daniil[language]}
        </a>
      </div>
      <p className={styles.year}>© 2022</p>
    </footer>
  );
};

export default Footer;
