import { useAppSelector } from './reduxHooks';

const useToken = () => {
  return useAppSelector((state) => state.authReducer.token);
};

export default useToken;
