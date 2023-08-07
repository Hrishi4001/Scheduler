import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
});

export const getSchedule = async () => {
  try {
    const response = await api.get('/fetchSchedule');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSchedule = async () => {
  try {
    const response = await api.get('/createSchedule');
    return response.data;
  } catch (error) {
    throw error;
  }
};
