export const TABS = {
  ALERTS: 'alerts',
  SUPPORT: 'support',
  DATADOG: 'datadog',
};

export const DEPARTMENTS = {
  ALL: 'all',
  FRONTEND: 'Web',
  BACKEND: 'backend',
  DEVOPS: 'devops',
  PRODUCT: 'product',
  IOS: 'ios',
  ANDROID: 'android',
  MOBILE: 'mobile',
};

export const DEPARTMENT_DETAILS = {
  [DEPARTMENTS.ALL]: { id: DEPARTMENTS.ALL, name: 'All Departments' },
  [DEPARTMENTS.FRONTEND]: { id: DEPARTMENTS.FRONTEND, name: 'Web', icon: '💻' },
  [DEPARTMENTS.BACKEND]: { id: DEPARTMENTS.BACKEND, name: 'Backend', icon: '🔧' },
  [DEPARTMENTS.DEVOPS]: { id: DEPARTMENTS.DEVOPS, name: 'DevOps', icon: '🚀' },
  [DEPARTMENTS.PRODUCT]: { id: DEPARTMENTS.PRODUCT, name: 'Product', icon: '📊' },
  [DEPARTMENTS.IOS]: { id: DEPARTMENTS.IOS, name: 'iOS', icon: '🍎' },
  [DEPARTMENTS.ANDROID]: { id: DEPARTMENTS.ANDROID, name: 'Android', icon: '🤖' },
  [DEPARTMENTS.MOBILE]: { id: DEPARTMENTS.MOBILE, name: 'Mobile', icon: '📱' },
};

export const SEVERITY = {
  INFO: 5,
  LOW: 4,
  MEDIUM: 3,
  HIGH: 2,
  CRITICAL: 1,
};

export const SEVERITY_BY_KEY = {
  info: 5,
  low: 4,
  medium: 3,
  high: 2,
  critical: 1,
};

export const SEVERITY_DETAILS = {
  ALL: { id: 'all', name: 'All Severities' },
  [SEVERITY.CRITICAL]: { id: SEVERITY.CRITICAL.toString(), name: 'Critical' },
  [SEVERITY.HIGH]: { id: SEVERITY.HIGH.toString(), name: 'High' },
  [SEVERITY.MEDIUM]: { id: SEVERITY.MEDIUM.toString(), name: 'Medium' },
  [SEVERITY.LOW]: { id: SEVERITY.LOW.toString(), name: 'Low' },
  [SEVERITY.INFO]: { id: SEVERITY.INFO.toString(), name: 'Info' },
};

export const getSeverityLabel = level => {
  switch (level) {
    case SEVERITY.CRITICAL:
      return 'Critical';
    case SEVERITY.HIGH:
      return 'High';
    case SEVERITY.MEDIUM:
      return 'Medium';
    case SEVERITY.LOW:
      return 'Low';
    default:
      return 'Info';
  }
};
