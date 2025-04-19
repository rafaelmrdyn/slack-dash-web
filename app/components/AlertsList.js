'use client';

import { useState, useEffect } from 'react';
import AlertCard from './AlertCard';
import { fetchAlerts, setupPolling } from '../services/apiService';
import styles from './AlertsList.module.css';

export default function AlertsList({ selectedDepartment, selectedSeverity, selectedTag }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up polling for real-time updates
    setLoading(true);
    const cleanup = setupPolling(
      fetchAlerts,
      data => {
        setAlerts(data);
        setLoading(false);
      },
      30000
    ); // Poll every 30 seconds

    // Clean up the interval when the component unmounts
    return cleanup;
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading alerts</div>;
  }

  // Filter alerts based on selected department and severity
  let filteredAlerts = alerts;

  // Apply department filter
  if (selectedDepartment !== 'all') {
    filteredAlerts = filteredAlerts.filter(alert => alert.department === selectedDepartment);
  }

  // Apply severity filter
  if (selectedSeverity !== 'all') {
    filteredAlerts = filteredAlerts.filter(
      alert => alert.importance === parseInt(selectedSeverity)
    );
  }

  // Apply tag filter
  if (selectedTag && selectedTag !== 'all') {
    filteredAlerts = filteredAlerts.filter(alert => alert.tags && alert.tags.includes(selectedTag));
  }

  if (filteredAlerts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No alerts</h3>
        <p>
          {alerts.length === 0
            ? 'There are no alerts at this time.'
            : selectedTag !== 'all' && selectedDepartment !== 'all' && selectedSeverity !== 'all'
              ? `There are no "${selectedTag}" tagged alerts with severity ${selectedSeverity} for the ${selectedDepartment} department.`
              : selectedTag !== 'all' && selectedDepartment !== 'all'
                ? `There are no "${selectedTag}" tagged alerts for the ${selectedDepartment} department.`
                : selectedTag !== 'all' && selectedSeverity !== 'all'
                  ? `There are no "${selectedTag}" tagged alerts with severity ${selectedSeverity}.`
                  : selectedDepartment !== 'all' && selectedSeverity !== 'all'
                    ? `There are no severity ${selectedSeverity} alerts for the ${selectedDepartment} department.`
                    : selectedTag !== 'all'
                      ? `There are no alerts tagged with "${selectedTag}".`
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
            {filteredAlerts.length}
            {selectedTag !== 'all' && selectedDepartment !== 'all' && selectedSeverity !== 'all'
              ? ` "${selectedTag}" tagged ${selectedDepartment} severity ${selectedSeverity} `
              : selectedTag !== 'all' && selectedDepartment !== 'all'
                ? ` "${selectedTag}" tagged ${selectedDepartment} `
                : selectedTag !== 'all' && selectedSeverity !== 'all'
                  ? ` "${selectedTag}" tagged severity ${selectedSeverity} `
                  : selectedDepartment !== 'all' && selectedSeverity !== 'all'
                    ? ` ${selectedDepartment} severity ${selectedSeverity} `
                    : selectedTag !== 'all'
                      ? ` "${selectedTag}" tagged `
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
