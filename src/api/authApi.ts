import { SignInType } from '../components/Main/components/SignIn/SignIn';
import { SignUpType } from '../components/Main/components/SignUp/SignUp';
import { instance } from './instance';

export const signIn = async (user: SignInType) => {
  console.log('user: ', user);
  await instance.post('auth/signin', user).then((res) => console.log(res));
};

export const signUp = async (user: SignUpType) => {
  console.log('user: ', user);
  await instance.post('auth/signup', user).then((res) => console.log(res));
};
