'use client';

import { SEVERITY, getSeverityLabel } from '../constants/enums';
import styles from './MessageCard.module.css';

export default function MessageCard({ item, type }) {
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
    const importance = item.importance;
    switch (importance) {
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

  const isAlert = type === 'alert';
  const timestamp = item.timestamp;
  const message = item.message;
  const importance = item.importance;
  const department = item.department;
  const channel = item.channel;
  const user = isAlert ? null : item.user;
  const recurring = isAlert ? item.recurring : null;
  const tags = isAlert ? item.tags : null;

  return (
    <div className={`${styles.messageCard} ${getImportanceClass()}`}>
      <div className={styles.messageHeader}>
        <div className={styles.channelInfo}>
          <span className={styles.channelBadge}>#{channel}</span>
          {user && <span className={styles.userBadge}>@{user}</span>}
        </div>
        <div className={styles.timestamp}>{formatTime(timestamp)}</div>
      </div>

      <div className={styles.messageContent}>{message}</div>

      <div className={styles.messageFooter}>
        <div className={styles.messageMeta}>
          <span className={styles.importanceBadge}>{getSeverityLabel(importance)}</span>
          {recurring && <span className={styles.recurringBadge}>Recurring</span>}
          <span className={styles.departmentBadge}>{department}</span>
          {tags && tags.length > 0 && (
            <div className={styles.tagsList}>
              {tags.map(tag => (
                <span key={tag} className={styles.tagBadge}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
