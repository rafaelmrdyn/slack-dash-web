export const TABS = {
  ALERTS: 'alerts',
  SUPPORT: 'support',
};

export const DEPARTMENTS = {
  ALL: 'all',
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DEVOPS: 'devops',
  PRODUCT: 'product',
  IOS: 'ios',
  ANDROID: 'android',
  MOBILE: 'mobile',
};

export const DEPARTMENT_DETAILS = {
  [DEPARTMENTS.ALL]: { id: DEPARTMENTS.ALL, name: 'All Departments' },
  [DEPARTMENTS.FRONTEND]: { id: DEPARTMENTS.FRONTEND, name: 'Frontend', icon: '💻' },
  [DEPARTMENTS.BACKEND]: { id: DEPARTMENTS.BACKEND, name: 'Backend', icon: '🔧' },
  [DEPARTMENTS.DEVOPS]: { id: DEPARTMENTS.DEVOPS, name: 'DevOps', icon: '🚀' },
  [DEPARTMENTS.PRODUCT]: { id: DEPARTMENTS.PRODUCT, name: 'Product', icon: '📊' },
  [DEPARTMENTS.IOS]: { id: DEPARTMENTS.IOS, name: 'iOS', icon: '🍎' },
  [DEPARTMENTS.ANDROID]: { id: DEPARTMENTS.ANDROID, name: 'Android', icon: '🤖' },
  [DEPARTMENTS.MOBILE]: { id: DEPARTMENTS.MOBILE, name: 'Mobile', icon: '📱' },
};

export const SEVERITY = {
  INFO: 1,
  LOW: 2,
  MEDIUM: 3,
  HIGH: 4,
  CRITICAL: 5,
};

export const SEVERITY_DETAILS = {
  ALL: { id: 'all', name: 'All Severities' },
  [SEVERITY.CRITICAL]: { id: SEVERITY.CRITICAL.toString(), name: 'Critical (5)' },
  [SEVERITY.HIGH]: { id: SEVERITY.HIGH.toString(), name: 'High (4)' },
  [SEVERITY.MEDIUM]: { id: SEVERITY.MEDIUM.toString(), name: 'Medium (3)' },
  [SEVERITY.LOW]: { id: SEVERITY.LOW.toString(), name: 'Low (2)' },
  [SEVERITY.INFO]: { id: SEVERITY.INFO.toString(), name: 'Info (1)' },
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
