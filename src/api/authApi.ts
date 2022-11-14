import { SignInType } from '../components/Main/components/SignIn/SignIn';
import { SignUpType } from '../components/Main/components/SignUp/SignUp';

import { instance } from './instance';

export const signIn = async (user: SignInType) => {
  return await instance.post('auth/signin', user);
};

export const signUp = async (user: SignUpType) => {
  return await instance.post('auth/signup', user);
};
