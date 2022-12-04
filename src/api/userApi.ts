import { instance } from './instance';
import { UserPutRequestType } from './../types/userTypes';

const getUser = async (userId: string) => {
  const response = await instance.get(`users/${userId}`, {
    headers: {
      accept: 'application/json',
    },
  });
  return response;
};

const deleteUser = async (userId: string) => {
  const response = await instance.delete(`users/${userId}`, {
    headers: {
      accept: 'application/json',
    },
  });
  return response;
};

const changeUser = async (userId: string, userData: UserPutRequestType) => {
  const response = await instance.put(`users/${userId}`, userData, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response;
};

const UserService = {
  getUser,
  deleteUser,
  changeUser,
};

export default UserService;
