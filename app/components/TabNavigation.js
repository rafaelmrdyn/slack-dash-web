'use client';

import { TABS } from '../constants/enums';
import styles from './TabNavigation.module.css';

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div className={styles.tabNavigation}>
      <button
        className={`${styles.tab} ${activeTab === TABS.ALERTS ? styles.active : ''}`}
        onClick={() => onTabChange(TABS.ALERTS)}
      >
        Non-Resolved Alerts
      </button>
      <button
        className={`${styles.tab} ${activeTab === TABS.SUPPORT ? styles.active : ''}`}
        onClick={() => onTabChange(TABS.SUPPORT)}
      >
        Not Reacted Support Messages
      </button>
    </div>
  );
}
