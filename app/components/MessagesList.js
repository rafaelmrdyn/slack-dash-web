'use client';

import { useState, useEffect } from 'react';
import MessageCard from './MessageCard';
import { fetchAlerts, fetchSupportMessages, setupPolling } from '../services/apiService';
import useDebounce from '@/app/hooks/useDebounce';
import { TABS } from '../constants/enums';
import styles from './MessagesList.module.css';

export default function MessagesList({
  type,
  selectedDepartment,
  selectedSeverity,
  searchTerm = '',
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAlerts = type === TABS.ALERTS;

  const debouncedInputValue = useDebounce(searchTerm.trim(), 500);

  useEffect(() => {
    setLoading(true);

    const fetchItemsWithSearch = () => {
      const params = {
        search: debouncedInputValue,
        department: selectedDepartment,
        severity: selectedSeverity,
      };

      return isAlerts ? fetchAlerts(params) : fetchSupportMessages(params);
    };

    const cleanup = setupPolling(
      fetchItemsWithSearch,
      data => {
        setItems(data);
        setLoading(false);
      },
      30000
    );

    return cleanup;
  }, [debouncedInputValue, selectedDepartment, selectedSeverity, isAlerts]);

  if (loading) {
    return <div className={styles.loading}>Loading {isAlerts ? 'alerts' : 'messages'}</div>;
  }

  let filteredItems = items;

  if (selectedDepartment !== 'all') {
    filteredItems = filteredItems.filter(item => item.department === selectedDepartment);
  }

  if (selectedSeverity !== 'all') {
    filteredItems = filteredItems.filter(item => item.importance === parseInt(selectedSeverity));
  }

  if (filteredItems.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No {isAlerts ? 'alerts' : 'messages'}</h3>
        <p>
          {items.length === 0
            ? `There are no ${isAlerts ? 'alerts' : 'support messages'} at this time.`
            : selectedDepartment !== 'all' && selectedSeverity !== 'all'
              ? `There are no severity ${selectedSeverity} ${isAlerts ? 'alerts' : 'support messages'} for the ${selectedDepartment} department.`
              : selectedSeverity !== 'all'
                ? `There are no severity ${selectedSeverity} ${isAlerts ? 'alerts' : 'support messages'}.`
                : selectedDepartment !== 'all'
                  ? `There are no ${isAlerts ? 'alerts' : 'support messages'} for the ${selectedDepartment} department.`
                  : `There are no ${isAlerts ? 'alerts' : 'support messages'} matching your filters.`}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.messagesList}>
      <div className={styles.messagesHeader}>
        <h2>{isAlerts ? 'Alerts' : 'Support Messages'}</h2>
        <div className={styles.messagesInfo}>
          <span className={styles.messagesCount}>
            {filteredItems.length}{' '}
            {selectedDepartment !== 'all' && selectedSeverity !== 'all'
              ? `${selectedDepartment} severity ${selectedSeverity} `
              : selectedSeverity !== 'all'
                ? `severity ${selectedSeverity} `
                : selectedDepartment !== 'all'
                  ? `${selectedDepartment} `
                  : ''}
            {isAlerts ? 'alerts' : 'messages'}
          </span>
        </div>
      </div>

      <div className={styles.messagesDescription}>
        <p>
          {isAlerts
            ? 'Alerts from monitoring systems. Sorted by importance (highest first).'
            : 'Messages from support channels. Sorted by importance (highest first).'}
        </p>
      </div>

      <div className={styles.messagesGrid}>
        {filteredItems.map(item => (
          <MessageCard key={item.id} item={item} type={isAlerts ? 'alert' : 'support'} />
        ))}
      </div>
    </div>
  );
}
