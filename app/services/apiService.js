import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qpk88mg9-3000.euw.devtunnels.ms/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAlerts = async ({ priority, search, signal }) => {
  try {
    const response = await api.get('/alerts', {
      params: { priority, search },
      signal,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchSupportMessages = async ({ search = '', department, severity, signal }) => {
  try {
    const response = await api.get('/messages', {
      params: { search, department, severity },
      signal,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchDatadogAnalytics = async ({ severity = '', signal }) => {
  try {
    const response = await api.get('/datadog-analytics', {
      params: { severity },
      signal,
    });
    debugger;
    return response.data;
  } catch (error) {
    return [];
  }
};
