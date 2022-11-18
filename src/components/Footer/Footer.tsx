import React, { FC } from 'react';
import styles from './Footer.module.css';
import textData from '../../data/textData';
import { useAppSelector } from '../../hooks/reduxHooks';
import rss from '../../assets/img/icons/rss-logo.png';

const Footer: FC = () => {
  const language = useAppSelector((store) => store.language.value);

  return (
    <footer className={styles.footerWrapper}>
      <a href="https://rs.school/react/" className={styles.logoLink}>
        <img src={rss} alt="RssLogo" className={styles.logo} />
      </a>
      <ul className={styles.github}>
        <li>
          <a href="https://github.com/Fronikon" className={styles.githubLink}>
            {textData.footer.Dmitry[language]}
          </a>
        </li>
        <li>
          <a href="https://github.com/InnokentyKedrov" className={styles.githubLink}>
            {textData.footer.Andrey[language]}
          </a>
        </li>
        <li>
          <a href="https://github.com/karap9s" className={styles.githubLink}>
            {textData.footer.Daniil[language]}
          </a>
        </li>
      </ul>
      <p className={styles.year}>© 2022</p>
    </footer>
  );
};

export default Footer;
