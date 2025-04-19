'use client';

import { useState, useEffect, useMemo } from 'react';
import MessageCard from './MessageCard';
import { fetchAlerts, fetchSupportMessages } from '../services/apiService';
import useDebounce from '@/app/hooks/useDebounce';
import {
  DEPARTMENTS,
  getSeverityLabel,
  SEVERITY,
  SEVERITY_BY_KEY,
  SEVERITY_DETAILS,
  TABS,
} from '../constants/enums';
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

    const abortController = new AbortController();

    async function fetchItemsWithSearch() {
      let params = { search: debouncedInputValue, signal: abortController.signal };

      if (SEVERITY_DETAILS.ALL.id !== selectedSeverity) {
        params.priority = selectedSeverity;
      }

      if (!isAlerts) {
        if (DEPARTMENTS.ALL !== selectedDepartment) {
          params.department = selectedDepartment;
        }
        if (SEVERITY_DETAILS.ALL.id !== selectedSeverity) {
          params.sevirity = getSeverityLabel(selectedSeverity).toLowerCase();
        }
      } else {
        if (SEVERITY_DETAILS.ALL.id !== selectedSeverity) {
          params.priority = selectedSeverity;
        }
      }

      return isAlerts ? fetchAlerts(params) : fetchSupportMessages(params);
    }

    fetchItemsWithSearch().then(data => {
      if (abortController.signal.aborted) return;
      setItems(data);
      setLoading(false);
    });

    const intervalId = setInterval(() => {
      fetchItemsWithSearch().then(data => {
        if (abortController.signal.aborted) return;
        setItems(data);
        setLoading(false);
      });
    }, 10000);

    return () => {
      abortController.abort();
      clearInterval(intervalId);
    };
  }, [debouncedInputValue, selectedDepartment, selectedSeverity, isAlerts]);

  const severityCounts = useMemo(() => {
    const counts = {
      [SEVERITY.CRITICAL]: 0,
      [SEVERITY.HIGH]: 0,
      [SEVERITY.MEDIUM]: 0,
      [SEVERITY.LOW]: 0,
      [SEVERITY.INFO]: 0,
    };

    items.forEach(item => {
      const severityKey = isAlerts ? item.priority : SEVERITY_BY_KEY[item.severity];
      if (counts[severityKey] !== undefined) {
        counts[severityKey]++;
      }
    });

    return counts;
  }, [items, isAlerts]);

  if (loading) {
    return <div className={styles.loading}>Loading {isAlerts ? 'alerts' : 'messages'}</div>;
  }

  if (items.length === 0) {
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
            {items.length}{' '}
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

      <div className={styles.severitySummary}>
        {Object.entries(severityCounts)
          .filter(([_, count]) => count > 0)
          .sort(([a], [b]) => Number(a) - Number(b)) // Sort by severity (critical first)
          .map(([severity, count]) => (
            <div
              key={severity}
              className={`${styles.severityCount} ${styles[`severity${getSeverityLabel(Number(severity))}`]}`}
            >
              <span className={styles.severityLabel}>{getSeverityLabel(Number(severity))}</span>
              <span className={styles.severityNumber}>{count}</span>
            </div>
          ))}
      </div>

      <div className={styles.messagesGrid}>
        {items.map(item => (
          <MessageCard key={item._id} item={item} type={isAlerts ? 'alert' : 'support'} />
        ))}
      </div>
    </div>
  );
}
