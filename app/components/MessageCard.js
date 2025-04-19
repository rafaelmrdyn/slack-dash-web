'use client';

import { SEVERITY, getSeverityLabel, SEVERITY_BY_KEY } from '../constants/enums';
import { format, formatDistanceToNow } from 'date-fns';
import styles from './MessageCard.module.css';

export default function MessageCard({ item, type }) {
  function formatTime(createdAt) {
    const date = new Date(createdAt);
    const formattedTime = format(date, 'hh:mm a');
    const relativeTime = formatDistanceToNow(date, { addSuffix: true });
    return `${formattedTime} (${relativeTime})`;
  }

  const isAlert = type === 'alert';
  const importance = isAlert ? item.priority : SEVERITY_BY_KEY[item.severity];

  const getImportanceClass = () => {
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

  const timestamp = item.createdAt;
  const message = item.text;
  const department = item.department;
  const channel = item.channelName;
  const user = isAlert ? null : item.userName;
  const recurring = isAlert ? item.count > 10 : null;
  const tags = !isAlert ? item.tags : null;

  return (
    <div className={`${styles.messageCard} ${getImportanceClass()}`}>
      <div className={styles.messageHeader}>
        <div className={styles.channelInfo}>
          <span className={styles.channelBadge}>{channel}</span>
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
