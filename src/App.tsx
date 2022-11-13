import React, { FC, useEffect } from 'react';
import styles from './App.module.css';
import { Footer, Header, Main } from './components/index';
import { useAppSelector } from './hooks/reduxHooks';

const App: FC = () => {
  const language = useAppSelector((store) => store.language.value);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <div className={styles.App}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
