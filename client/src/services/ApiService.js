import axios from 'axios';

export const loginUser = async (user) => {
  try {
    const res = await axios.post('http://localhost:8000/login/', user);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const home = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const res = await axios.get('http://localhost:8000/home/', config);
    return res;
  } catch (error) {
    return error.response;
  }
};
