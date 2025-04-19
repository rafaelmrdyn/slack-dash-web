'use client';

import { useState, useEffect } from 'react';
import AlertCard from './AlertCard';
import { fetchAlerts, setupPolling } from '../services/apiService';
import useDebounce from '@/app/hooks/useDebounce';
import styles from './AlertsList.module.css';

export default function AlertsList({ selectedDepartment, selectedSeverity, searchTerm = '' }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const debouncedInputValue = useDebounce(searchTerm.trim(), 500);
  useEffect(() => {
    const fetchAlertsWithSearch = () =>
      fetchAlerts({
        search: debouncedInputValue,
        department: selectedDepartment,
        severity: selectedSeverity,
      });
    setLoading(true);
    const cleanup = setupPolling(
      fetchAlertsWithSearch,
      data => {
        setAlerts(data);
        setLoading(false);
      },
      30000
    );
    return cleanup;
  }, [debouncedInputValue, selectedDepartment, selectedSeverity]);

  if (loading) {
    return <div className={styles.loading}>Loading alerts</div>;
  }

  let filteredAlerts = alerts;

  if (selectedDepartment !== 'all') {
    filteredAlerts = filteredAlerts.filter(alert => alert.department === selectedDepartment);
  }

  if (selectedSeverity !== 'all') {
    filteredAlerts = filteredAlerts.filter(
      alert => alert.importance === parseInt(selectedSeverity)
    );
  }

  if (filteredAlerts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No alerts</h3>
        <p>
          {alerts.length === 0
            ? 'There are no alerts at this time.'
            : selectedDepartment !== 'all' && selectedSeverity !== 'all'
              ? `There are no severity ${selectedSeverity} alerts for the ${selectedDepartment} department.`
              : selectedSeverity !== 'all'
                ? `There are no severity ${selectedSeverity} alerts.`
                : selectedDepartment !== 'all'
                  ? `There are no alerts for the ${selectedDepartment} department.`
                  : 'There are no alerts matching your filters.'}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.alertsList}>
      <div className={styles.alertsHeader}>
        <h2>Alerts</h2>
        <div className={styles.alertsInfo}>
          <span className={styles.alertsCount}>
            {filteredAlerts.length}{' '}
            {selectedDepartment !== 'all' && selectedSeverity !== 'all'
              ? ` ${selectedDepartment} severity ${selectedSeverity} `
              : selectedSeverity !== 'all'
                ? ` severity ${selectedSeverity} `
                : selectedDepartment !== 'all'
                  ? ` ${selectedDepartment} `
                  : ' '}
            alerts
          </span>
        </div>
      </div>

      <div className={styles.alertsDescription}>
        <p>Alerts from monitoring systems. Sorted by importance (highest first).</p>
      </div>

      <div className={styles.alertsGrid}>
        {filteredAlerts.map(alert => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
