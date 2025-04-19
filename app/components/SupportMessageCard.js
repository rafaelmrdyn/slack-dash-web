'use client';

import styles from './SupportMessageCard.module.css';

export default function SupportMessageCard({ message }) {
  // Format the timestamp to a readable format
  const formatTime = isoString => {
    const date = new Date(isoString);
    return (
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
      ' (' +
      getTimeAgo(date) +
      ')'
    );
  };

  // Calculated time ago
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

  // Determine importance class
  const getImportanceClass = () => {
    switch (message.importance) {
      case 5:
        return styles.criticalImportance;
      case 4:
        return styles.highImportance;
      case 3:
        return styles.mediumImportance;
      case 2:
        return styles.lowImportance;
      default:
        return styles.infoImportance;
    }
  };

  // Determine importance label
  const getImportanceLabel = () => {
    switch (message.importance) {
      case 5:
        return 'Critical';
      case 4:
        return 'High';
      case 3:
        return 'Medium';
      case 2:
        return 'Low';
      default:
        return 'Info';
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
          <span className={styles.importanceBadge}>{getImportanceLabel()}</span>
          <span className={styles.departmentBadge}>{message.department}</span>
        </div>
      </div>
    </div>
  );
}
