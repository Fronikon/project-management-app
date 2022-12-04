export interface UserPutRequestType {
  name: string;
  login: string;
  password: string;
}

export interface UserPostRequestType {
  userId: string;
}

export interface UserResponseType {
  login: string;
  name: string;
  _id: string;
}
