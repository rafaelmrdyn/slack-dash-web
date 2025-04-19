'use client';

import { useState } from 'react';
import { SEVERITY, getSeverityLabel, SEVERITY_BY_KEY } from '../constants/enums';
import { format, formatDistanceToNow } from 'date-fns';
import styles from './MessageCard.module.css';

export default function MessageCard({ item, type }) {
  const [showAllTags, setShowAllTags] = useState(false);

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
  const count = isAlert && item.count ? item.count : null;
  const tags = !isAlert ? item.tags : null;
  const url = item.url;
  const MAX_VISIBLE_TAGS = 3;

  const handleCardClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleShowMoreTags = e => {
    e.stopPropagation();
    setShowAllTags(!showAllTags);
  };

  return (
    <div
      className={`${styles.messageCard} ${getImportanceClass()} ${url ? styles.clickable : ''}`}
      onClick={handleCardClick}
    >
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
          {count && count > 1 && <span className={styles.recurringBadge}>Count: {count}</span>}
          <span className={styles.departmentBadge}>{department}</span>
          {tags && tags.length > 0 && (
            <div className={styles.tagsList}>
              {(showAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS)).map(tag => (
                <span key={tag} className={styles.tagBadge}>
                  #{tag}
                </span>
              ))}
              {tags.length > MAX_VISIBLE_TAGS && (
                <button className={styles.showMoreButton} onClick={handleShowMoreTags}>
                  {showAllTags ? 'Show Less' : `Show More (${tags.length - MAX_VISIBLE_TAGS})`}
                </button>
              )}
            </div>
          )}
        </div>
        {url && <div className={styles.urlIndicator}>🔗</div>}
      </div>
    </div>
  );
}
