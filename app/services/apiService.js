import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qpk88mg9-3000.euw.devtunnels.ms/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAlerts = async ({ priority, search }) => {
  try {
    const response = await api.get('/alerts', {
      params: { priority, search },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

export const fetchSupportMessages = async ({ search = '', department, severity }) => {
  try {
    const response = await api.get('/messages', {
      params: { search, department, severity },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching support messages:', error);
    throw error;
  }
};

export const setupPolling = (fetchFunction, setDataFunction, interval = 30000) => {
  fetchFunction().then(setDataFunction).catch(console.error);
  const intervalId = setInterval(() => {
    fetchFunction().then(setDataFunction).catch(console.error);
  }, interval);
  return () => clearInterval(intervalId);
};
