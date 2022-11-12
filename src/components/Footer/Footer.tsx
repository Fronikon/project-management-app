import React, { FC } from 'react';
import styles from './Footer.module.css';
import rss from '../../assets/img/icons/rss-logo.png';

const Footer: FC = () => {
  return (
    <footer className={styles.footerWrapper}>
      <a href="https://rs.school/react/" className={styles.logoLink}>
        <img src={rss} alt="RssLogo" className={styles.logo} />
      </a>
      <div className={styles.github}>
        <a href="https://github.com/Fronikon" className={styles.githubLink}>
          Dmitry Beresnev
        </a>
        <a href="https://github.com/InnokentyKedrov" className={styles.githubLink}>
          Andrey Lavrenov
        </a>
        <a href="https://github.com/karap9s" className={styles.githubLink}>
          Daniil Sharenkov
        </a>
      </div>
      <p className={styles.year}>© 2022</p>
    </footer>
  );
};

export default Footer;
