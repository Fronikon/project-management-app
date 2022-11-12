import React, { FC, useEffect } from 'react';
import styles from './App.module.css';
import { Footer, Header, Main } from './components/index';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { switchEng, switchRu } from './store/reducers/languageReducer';

const App: FC = () => {
  const language = useAppSelector((store) => store.language.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener('unload', () => {
      localStorage.setItem('language', language);
    });
  }, [language]);

  useEffect(() => {
    const value = localStorage.getItem('language');

    if (value === 'ru') {
      dispatch(switchRu());
    } else if (value === 'eng') {
      dispatch(switchEng());
    }
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
