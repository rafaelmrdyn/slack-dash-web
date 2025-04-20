'use client';

import { useState, useEffect, useMemo } from 'react';
import MessageCard from './MessageCard';
import { fetchAlerts, fetchSupportMessages, fetchDatadogAnalytics } from '../services/apiService';
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
  const isDatadog = type === TABS.DATADOG;

  const debouncedInputValue = useDebounce(searchTerm.trim(), 500);

  useEffect(() => {
    setLoading(true);

    const abortController = new AbortController();

    async function fetchItemsWithSearch() {
      let params = { search: debouncedInputValue, signal: abortController.signal };

      if (SEVERITY_DETAILS.ALL.id !== selectedSeverity) {
        params.priority = selectedSeverity;
      }

      if (isDatadog) {
        if (SEVERITY_DETAILS.ALL.id !== selectedSeverity) {
          params.severity = selectedSeverity;
        }
        return fetchDatadogAnalytics(params);
      } else if (!isAlerts) {
        if (DEPARTMENTS.ALL !== selectedDepartment) {
          params.department = selectedDepartment;
        }
        if (SEVERITY_DETAILS.ALL.id !== selectedSeverity) {
          params.sevirity = getSeverityLabel(selectedSeverity).toLowerCase();
        }
        return fetchSupportMessages(params);
      } else {
        if (SEVERITY_DETAILS.ALL.id !== selectedSeverity) {
          params.priority = selectedSeverity;
        }
        return fetchAlerts(params);
      }
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
    }, 5000);

    return () => {
      abortController.abort();
      clearInterval(intervalId);
    };
  }, [debouncedInputValue, selectedDepartment, selectedSeverity, isAlerts, isDatadog]);

  const severityCounts = useMemo(() => {
    const counts = {
      [SEVERITY.CRITICAL]: 0,
      [SEVERITY.HIGH]: 0,
      [SEVERITY.MEDIUM]: 0,
      [SEVERITY.LOW]: 0,
      [SEVERITY.INFO]: 0,
    };

    items.forEach(item => {
      const severityKey = isAlerts
        ? item.priority
        : isDatadog
          ? item.severity
          : SEVERITY_BY_KEY[item.severity];
      if (counts[severityKey] !== undefined) {
        counts[severityKey]++;
      }
    });

    return counts;
  }, [items, isAlerts, isDatadog]);

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading {isAlerts ? 'alerts' : isDatadog ? 'Datadog analytics' : 'messages'}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No {isAlerts ? 'alerts' : isDatadog ? 'Datadog analytics' : 'messages'}</h3>
        <p>
          {items.length === 0
            ? `There are no ${isAlerts ? 'alerts' : isDatadog ? 'Datadog analytics' : 'support messages'} at this time.`
            : selectedDepartment !== 'all' && selectedSeverity !== 'all' && !isDatadog
              ? `There are no severity ${selectedSeverity} ${isAlerts ? 'alerts' : 'support messages'} for the ${selectedDepartment} department.`
              : selectedSeverity !== 'all'
                ? `There are no severity ${selectedSeverity} ${isAlerts ? 'alerts' : isDatadog ? 'Datadog analytics' : 'support messages'}.`
                : selectedDepartment !== 'all' && !isDatadog
                  ? `There are no ${isAlerts ? 'alerts' : 'support messages'} for the ${selectedDepartment} department.`
                  : `There are no ${isAlerts ? 'alerts' : isDatadog ? 'Datadog analytics' : 'support messages'} matching your filters.`}
        </p>
      </div>
    );
  }
  console.log(items);
  return (
    <div className={styles.messagesList}>
      <div className={styles.messagesHeader}>
        <h2>{isAlerts ? 'Alerts' : isDatadog ? 'Datadog Analytics' : 'Support Messages'}</h2>
        <div className={styles.messagesInfo}>
          <span className={styles.messagesCount}>
            {items.length}{' '}
            {selectedDepartment !== 'all' && selectedSeverity !== 'all' && !isDatadog
              ? `${selectedDepartment} severity ${selectedSeverity} `
              : selectedSeverity !== 'all'
                ? `severity ${selectedSeverity} `
                : selectedDepartment !== 'all' && !isDatadog
                  ? `${selectedDepartment} `
                  : ''}
            {isAlerts ? 'alerts' : isDatadog ? 'Datadog analytics' : 'messages'}
          </span>
        </div>
      </div>

      <div className={styles.messagesDescription}>
        <p>
          {isAlerts
            ? 'Alerts from monitoring systems. Sorted by importance (highest first).'
            : isDatadog
              ? 'Analytics from Datadog monitoring. Sorted by importance (highest first).'
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
          <MessageCard
            key={item._id}
            item={item}
            type={isAlerts ? 'alert' : isDatadog ? 'datadog' : 'support'}
          />
        ))}
      </div>
    </div>
  );
}
