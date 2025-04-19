'use client';

import { SEVERITY, getSeverityLabel } from '../constants/enums';
import styles from './SupportMessageCard.module.css';

export default function SupportMessageCard({ message }) {
  const formatTime = isoString => {
    const date = new Date(isoString);
    return (
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
      ' (' +
      getTimeAgo(date) +
      ')'
    );
  };

  const getTimeAgo = date => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m ago`;
    }
  };

  const getImportanceClass = () => {
    switch (message.importance) {
      case SEVERITY.CRITICAL:
        return styles.criticalImportance;
      case SEVERITY.HIGH:
        return styles.highImportance;
      case SEVERITY.MEDIUM:
        return styles.mediumImportance;
      case SEVERITY.LOW:
        return styles.lowImportance;
      default:
        return styles.infoImportance;
    }
  };

  return (
    <div className={`${styles.messageCard} ${getImportanceClass()}`}>
      <div className={styles.messageHeader}>
        <div className={styles.channelInfo}>
          <span className={styles.channelBadge}>#{message.channel}</span>
          <span className={styles.userBadge}>@{message.user}</span>
        </div>
        <div className={styles.timestamp}>{formatTime(message.timestamp)}</div>
      </div>

      <div className={styles.messageContent}>{message.message}</div>

      <div className={styles.messageFooter}>
        <div className={styles.messageMeta}>
          <span className={styles.importanceBadge}>{getSeverityLabel(message.importance)}</span>
          <span className={styles.departmentBadge}>{message.department}</span>
        </div>
      </div>
    </div>
  );
}
