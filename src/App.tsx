import React, { FC } from 'react';
import './App.css';
import { Footer, Header, Main } from './components/index';

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
