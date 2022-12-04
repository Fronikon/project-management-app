import axios, { AxiosError } from 'axios';
import textData from '../data/textData';

export const getErrorMessage = (error: AxiosError | Error, language: 'ru' | 'eng'): string => {
  const serverErrors = textData.serverErrors;
  const { otherError, loginAlreadyExist, notFound, wrongLoginOrPassword, youAreNotLoggedIn } =
    serverErrors;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 401) {
      return wrongLoginOrPassword[language];
    }
    if (status === 403) {
      return youAreNotLoggedIn[language];
    }
    if (status === 404) {
      return notFound[language];
    }
    if (status === 409) {
      return loginAlreadyExist[language];
    }
  }

  return otherError[language];
};
