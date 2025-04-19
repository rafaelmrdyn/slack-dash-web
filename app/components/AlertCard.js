'use client';

import { SEVERITY, getSeverityLabel } from '../constants/enums';
import styles from './AlertCard.module.css';

export default function AlertCard({ alert }) {
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
    switch (alert.importance) {
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
    <div className={`${styles.alertCard} ${getImportanceClass()}`}>
      <div className={styles.alertHeader}>
        <div className={styles.channelBadge}>#{alert.channel}</div>
        <div className={styles.timestamp}>{formatTime(alert.timestamp)}</div>
      </div>

      <div className={styles.alertMessage}>{alert.message}</div>

      <div className={styles.alertFooter}>
        <div className={styles.alertMeta}>
          <span className={styles.importanceBadge}>{getSeverityLabel(alert.importance)}</span>
          {alert.recurring && <span className={styles.recurringBadge}>Recurring</span>}
          <span className={styles.departmentBadge}>{alert.department}</span>
          {alert.tags && alert.tags.length > 0 && (
            <div className={styles.tagsList}>
              {alert.tags.map(tag => (
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
