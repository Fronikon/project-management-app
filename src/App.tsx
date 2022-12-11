import React, { FC, useState, useEffect } from 'react';
import styles from './App.module.css';
import { Footer, Header, Main } from './components/index';
import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { logOut } from './store/reducers/authReducer';
import tokenEvent from './utils/tokenEvent';
import { cleanError } from './store/reducers/errorAndLoadingReducer';
import modalStyles from './componentsUtils/Modal/Modal.module.css';
import Modal from './componentsUtils/Modal/Modal';

const App: FC = () => {
  const language = useAppSelector((store) => store.language.value);
  const dispatch = useAppDispatch();
  const error = useAppSelector((store) => store.errorAndLoadingReducer.error);
  const [isModalError, setIsModalError] = useState(false);

  const closeModalError = () => {
    setIsModalError(false);
    dispatch(cleanError());
  };

  useEffect(() => {
    if (error) setIsModalError(true);
  }, [error]);

  useEffect(() => {
    tokenEvent.on(() => {
      dispatch(logOut());
    });
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <div className={styles.App}>
      <Header />
      <Main />
      <Footer />
      {isModalError && (
        <Modal closeModal={closeModalError}>
          <div className={modalStyles.modalWrapper}>
            <h2>{error}</h2>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
