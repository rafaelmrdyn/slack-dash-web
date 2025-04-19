import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qpk88mg9-3000.euw.devtunnels.ms/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAlerts = async ({ priority, search, signal }) => {
  try {
    return [
      {
        _id: '68039fe5d822dc80547f5ec4',
        text: 'Wallet balance call is slow on @chain:fantom',
        channelId: 'C08P6661NSD',
        channelName: '#test-alerts',
        count: 1,
        createdAt: '2025-04-19T13:06:45.558Z',
        isNew: true,
        priority: 1,
        resolved: false,
        timestamp: '1745067913.718609',
        updatedAt: '2025-04-19T13:38:12.849Z',
      },
      {
        _id: '6803b21cd822dc80547f939e',
        text: '[coinstats-h6] AxiosError',
        channelId: 'C08P6661NSD',
        channelName: '#test-alerts',
        count: 1,
        createdAt: '2025-04-19T14:24:28.135Z',
        isNew: true,
        priority: 1,
        resolved: false,
        timestamp: '1745072403.865199',
        timestamps: ['1745072403.865199'],
        updatedAt: '2025-04-19T14:24:28.135Z',
        url: 'https://coinstatshq.slack.com/archives/C03TW6NJ6MA/p1745071930745249?thread_ts=1745060455.646459&cid=C03TW6NJ6MA',
      },
      {
        _id: '6803b21cd822dc80547f93a1',
        text: '[coinstats-h6] Error',
        channelId: 'C08P6661NSD',
        channelName: '#test-alerts',
        count: 1,
        createdAt: '2025-04-19T14:24:28.149Z',
        isNew: true,
        priority: 1,
        resolved: false,
        timestamp: '1745072328.035699',
        timestamps: ['1745072328.035699'],
        updatedAt: '2025-04-19T14:24:28.149Z',
        url: 'https://coinstatshq.slack.com/archives/C03TW6NJ6MA/p1745072284242569?thread_ts=1744317378.709499&cid=C03TW6NJ6MA',
      },
      {
        _id: '68039fe5d822dc80547f5ec7',
        text: 'Wallet balance call is slow on @chain:avalanche',
        channelId: 'C08P6661NSD',
        channelName: '#test-alerts',
        count: 3,
        createdAt: '2025-04-19T13:06:45.573Z',
        isNew: true,
        priority: 3,
        resolved: false,
        timestamp: '1745067825.212719',
        updatedAt: '2025-04-19T14:31:54.689Z',
        timestamps: ['1745068502.421549', '1745068033.988489', '1745068027.043929'],
        recoveredAt: '2025-04-19T13:14:27.342Z',
      },
    ];
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
    return [
      {
        _id: '6803883ad822dc80547f3aff',
        messageId: '1745053773.938649',
        channelId: 'C08NYLMBZM1',
        channelName: '#test-support',
        createdAt: '2025-04-19T09:09:33.938Z',
        department: 'backend',
        forwarded: true,
        replied: false,
        severity: 'critical',
        tags: [
          'login',
          'email',
          'authentication',
          'user',
          'login issue',
          'email login',
          'error',
          'access problem',
          'sign in',
          'account',
          'credentials',
          'login failure',
          'bug',
          'support',
          'user feedback',
        ],
        text: 'user says that login with email does not work',
        updatedAt: '2025-04-19T11:25:46.293Z',
        userId: 'U01UCU0TSM7',
        userImage:
          'https://avatars.slack-edge.com/2023-06-09/5413520644033_17cf8bad5f6e72d81107_72.jpg',
        userName: 'Rafael Muradyan',
        forwardedChannelId: 'C08NLM0MQK0',
        forwardedMessageId: '1745061946.534899',
        priority: 2,
        url: 'https://app.slack.com/client/T00000000/C08NYLMBZM1/thread/1745053773.938649',
      },
      {
        _id: '6803ad75d822dc80547f83d1',
        messageId: '1745058572.526939',
        channelId: 'C08NYLMBZM1',
        channelName: '#test-support',
        createdAt: '2025-04-19T10:29:32.526Z',
        department: 'backend',
        forwarded: true,
        replied: false,
        severity: 'medium',
        tags: [
          'coin prices',
          'syncing issues',
          'price synchronization',
          'data sync',
          'coin data',
          'price updates',
          'synchronization error',
          'price feed',
          'currency sync',
          'real-time updates',
          'syncing problem',
          'coin tracking',
          'data issues',
          'user report',
          'technical issue',
        ],
        text: 'user says that coin prices are not syncing',
        updatedAt: '2025-04-19T14:04:37.002Z',
        userId: 'U01UCU0TSM7',
        userImage:
          'https://avatars.slack-edge.com/2023-06-09/5413520644033_17cf8bad5f6e72d81107_72.jpg',
        userName: 'Rafael Muradyan',
        forwardedChannelId: 'C08NLM0MQK0',
        forwardedMessageId: '1745071477.236549',
        priority: 3,
        url: 'https://app.slack.com/client/T00000000/C08NYLMBZM1/thread/1745058572.526939',
      },
      {
        _id: '6803ad77d822dc80547f83d6',
        messageId: '1745053786.884959',
        channelId: 'C08NYLMBZM1',
        channelName: '#test-support',
        createdAt: '2025-04-19T09:09:46.884Z',
        department: 'web',
        forwarded: true,
        replied: false,
        severity: 'low',
        tags: [
          'dark mode',
          'icons',
          'broken',
          'ui issue',
          'user feedback',
          'display problem',
          'theme',
          'interface',
          'bug',
          'visual glitch',
          'dark theme',
          'icon issue',
          'user report',
        ],
        text: 'user says that dark mode icons are broken',
        updatedAt: '2025-04-19T14:04:39.382Z',
        userId: 'U01UCU0TSM7',
        userImage:
          'https://avatars.slack-edge.com/2023-06-09/5413520644033_17cf8bad5f6e72d81107_72.jpg',
        userName: 'Rafael Muradyan',
        forwardedChannelId: 'C08NZ3CGPHS',
        forwardedMessageId: '1745071479.624049',
        priority: 3,
        url: 'https://app.slack.com/client/T00000000/C08NYLMBZM1/thread/1745053786.884959',
      },
    ];
    const response = await api.get('/messages', {
      params: { search, department, severity },
      signal,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};
