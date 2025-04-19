// Mock data for development purposes

export const mockAlerts = [
  {
    id: 'alert-1',
    timestamp: new Date(Date.now() - 90 * 60000).toISOString(), // 90 minutes ago
    channel: 'monitoring-alerts',
    message: '[CRITICAL] Database connection timeout in production environment',
    importance: 5,
    recurring: true,
    resolved: false,
    department: 'backend',
  },
  {
    id: 'alert-2',
    timestamp: new Date(Date.now() - 70 * 60000).toISOString(), // 70 minutes ago
    channel: 'datadog-alerts',
    message: '[WARNING] High CPU usage detected on api-server-03 (85%)',
    importance: 3,
    recurring: false,
    resolved: false,
    department: 'devops',
  },
  {
    id: 'alert-3',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
    channel: 'monitoring-alerts',
    message: '[ERROR] Payment processing service unavailable',
    importance: 4,
    recurring: true,
    resolved: false,
    department: 'backend',
  },
  {
    id: 'alert-4',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
    channel: 'datadog-alerts',
    message: '[INFO] Scheduled maintenance starting in 30 minutes',
    importance: 2,
    recurring: false,
    resolved: false,
    department: 'devops',
  },
  {
    id: 'alert-5',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
    channel: 'monitoring-alerts',
    message: '[WARNING] Memory leak detected in web-server-02',
    importance: 3,
    recurring: false,
    resolved: false,
    department: 'frontend',
  },
];

export const mockSupportMessages = [
  {
    id: 'support-1',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
    channel: 'dev-help',
    user: 'alex.smith',
    message: "URGENT: I need help with the deployment pipeline, it's blocking our release",
    importance: 5,
    reacted: false,
    department: 'devops',
  },
  {
    id: 'support-2',
    timestamp: new Date(Date.now() - 90 * 60000).toISOString(), // 90 minutes ago
    channel: 'customer-support',
    user: 'maria.johnson',
    message: "Customer is reporting that they can't access their account dashboard",
    importance: 4,
    reacted: false,
    department: 'product',
  },
  {
    id: 'support-3',
    timestamp: new Date(Date.now() - 75 * 60000).toISOString(), // 75 minutes ago
    channel: 'dev-help',
    user: 'james.wilson',
    message:
      'Has anyone seen this error before? Getting "undefined is not a function" in the checkout flow',
    importance: 3,
    reacted: false,
    department: 'frontend',
  },
  {
    id: 'support-4',
    timestamp: new Date(Date.now() - 65 * 60000).toISOString(), // 65 minutes ago
    channel: 'general',
    user: 'sarah.davis',
    message:
      "Need some help with the new API documentation, can't find the authentication examples",
    importance: 2,
    reacted: false,
    department: 'backend',
  },
  {
    id: 'support-5',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
    channel: 'customer-support',
    user: 'david.brown',
    message: 'BLOCKER: Multiple customers reporting 404 errors on the product page',
    importance: 5,
    reacted: false,
    department: 'frontend',
  },
];
