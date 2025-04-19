import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Alerts API
export const fetchAlerts = async (searchTerm = '') => {
  try {
    const response = await api.get('/alerts', {
      params: { search: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

export const resolveAllAlerts = async () => {
  try {
    const response = await api.post('/alerts', { action: 'resolveAll' });
    return response.data;
  } catch (error) {
    console.error('Error resolving all alerts:', error);
    throw error;
  }
};

export const resolveAlert = async id => {
  try {
    const response = await api.post('/alerts', { action: 'resolve', id });
    return response.data;
  } catch (error) {
    console.error(`Error resolving alert ${id}:`, error);
    throw error;
  }
};

// Support Messages API
export const fetchSupportMessages = async (searchTerm = '') => {
  try {
    const response = await api.get('/support-messages', {
      params: { search: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching support messages:', error);
    throw error;
  }
};

export const reactToAllMessages = async () => {
  try {
    const response = await api.post('/support-messages', { action: 'reactAll' });
    return response.data;
  } catch (error) {
    console.error('Error reacting to all messages:', error);
    throw error;
  }
};

export const reactToMessage = async id => {
  try {
    const response = await api.post('/support-messages', { action: 'react', id });
    return response.data;
  } catch (error) {
    console.error(`Error reacting to message ${id}:`, error);
    throw error;
  }
};

// Function to set up polling for real-time updates
export const setupPolling = (fetchFunction, setDataFunction, interval = 30000) => {
  // Initial fetch
  fetchFunction().then(setDataFunction).catch(console.error);

  // Set up polling interval
  const intervalId = setInterval(() => {
    fetchFunction().then(setDataFunction).catch(console.error);
  }, interval);

  // Return a cleanup function to clear the interval
  return () => clearInterval(intervalId);
};
