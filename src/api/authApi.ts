import { SignInType } from '../components/Main/components/SignIn/SignIn';
import { SignUpType } from '../components/Main/components/SignUp/SignUp';
import { instance } from './instance';

const signIn = async (userData: SignInType) => {
  return await instance.post('auth/signin', userData);
};
const signUp = async (userData: SignUpType) => {
  return await instance.post('auth/signup', userData);
};

const AuthService = { signIn, signUp };

export default AuthService;
