import { instance } from './instance';
import { UserPutRequestType } from './../types/userTypes';

const getUser = async (userId: string, token: string) => {
  const response = await instance.get(`users/${userId}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const deleteUser = async (userId: string, token: string) => {
  const response = await instance.delete(`users/${userId}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const changeUser = async (userId: string, userData: UserPutRequestType, token: string) => {
  const response = await instance.put(`users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
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
