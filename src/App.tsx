import React, { FC } from 'react';
import styles from './App.module.css';
import { Footer, Header, Main } from './components/index';

const App: FC = () => {
  return (
    <div className={styles.App}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
