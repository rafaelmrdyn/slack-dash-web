'use client';

import styles from './TabNavigation.module.css';

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div className={styles.tabNavigation}>
      <button
        className={`${styles.tab} ${activeTab === 'alerts' ? styles.active : ''}`}
        onClick={() => onTabChange('alerts')}
      >
        Non-Resolved Alerts
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'support' ? styles.active : ''}`}
        onClick={() => onTabChange('support')}
      >
        Not Reacted Support Messages
      </button>
    </div>
  );
}
