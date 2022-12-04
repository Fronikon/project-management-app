const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token) : null;
};

const setToken = (token: string): void => {
  localStorage.setItem('token', JSON.stringify(token));
};

const removeToken = (): void => {
  localStorage.removeItem('token');
};

const getUser = (): string | null => {
  const userId = localStorage.getItem('userId');
  return userId ? JSON.parse(userId) : null;
};

const setUser = (userId: string): void => {
  localStorage.setItem('userId', JSON.stringify(userId));
};

const removeUser = (): void => {
  localStorage.removeItem('userId');
};

const TokenService = {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
