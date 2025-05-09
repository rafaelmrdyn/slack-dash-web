'use client';

import { useState } from 'react';
import { SEVERITY, getSeverityLabel, SEVERITY_BY_KEY } from '../constants/enums';
import { format, formatDistanceToNow } from 'date-fns';
import styles from './MessageCard.module.css';

export default function MessageCard({ item, type }) {
  const [showAllTags, setShowAllTags] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);

  function formatTime(createdAt) {
    const date = new Date(createdAt);
    const formattedTime = format(date, 'hh:mm a');
    const relativeTime = formatDistanceToNow(date, { addSuffix: true });
    return `${formattedTime} (${relativeTime})`;
  }

  const isAlert = type === 'alert';
  const isDatadog = type === 'datadog';
  const importance = isAlert
    ? item.priority
    : isDatadog
      ? item.severity
      : SEVERITY_BY_KEY[item.severity];

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
  const message = isDatadog ? item.summary : item.text;
  const department = isDatadog ? item.service : item.department;
  const channel = isDatadog ? item.serviceId?.[0] : item.channelName;
  const user = isAlert || isDatadog ? null : item.userName;
  const userImage =
    !isAlert && !isDatadog
      ? item.userImage || item.userAvatar || item.avatar || item.profilePicture || item.profileImage
      : null;
  const count = isAlert && item.count ? item.count : null;
  const tags = !isAlert && !isDatadog ? item.tags : null;
  const url = item.url;
  const MAX_VISIBLE_TAGS = 3;
  const MAX_MESSAGE_LENGTH = 150;

  const handleCardClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleShowMoreTags = e => {
    e.stopPropagation();
    setShowAllTags(!showAllTags);
  };

  const handleShowMoreMessage = e => {
    e.stopPropagation();
    setShowFullMessage(!showFullMessage);
  };

  return (
    <div
      className={`${styles.messageCard} ${getImportanceClass()} ${url ? styles.clickable : ''}`}
      onClick={handleCardClick}
    >
      <div className={styles.messageHeader}>
        <div className={styles.channelInfo}>
          {userImage && (
            <div className={styles.userImageContainer}>
              <img
                src={userImage}
                alt={user || 'User'}
                width={24}
                height={24}
                className={styles.userImage}
              />
            </div>
          )}
          <span className={styles.channelBadge}>{channel}</span>
          {user && <span className={styles.userBadge}>@{user}</span>}
        </div>
        <div className={styles.timestamp}>{formatTime(timestamp)}</div>
      </div>

      <div className={styles.messageContent}>
        {isDatadog && (
          <div className={styles.messageTitle}>
            <strong>{item.title}</strong>
          </div>
        )}
        {message && message.length > MAX_MESSAGE_LENGTH && !showFullMessage ? (
          <>
            {message.substring(0, MAX_MESSAGE_LENGTH)}...
            <button className={styles.showMoreButton} onClick={handleShowMoreMessage}>
              Show More
            </button>
          </>
        ) : (
          message
        )}
        {message && message.length > MAX_MESSAGE_LENGTH && showFullMessage && (
          <button className={styles.showMoreButton} onClick={handleShowMoreMessage}>
            Show Less
          </button>
        )}
      </div>

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
