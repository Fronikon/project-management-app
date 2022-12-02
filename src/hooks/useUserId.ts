import { useAppSelector } from './reduxHooks';

const useUserId = () => {
  return useAppSelector((state) => state.authReducer.userId);
};

export default useUserId;
