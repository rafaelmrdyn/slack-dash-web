'use client';

import styles from './SeverityFilter.module.css';

export default function SeverityFilter({ selectedSeverity, onSeverityChange }) {
  const severityLevels = [
    { id: 'all', name: 'All Severities' },
    { id: '5', name: 'Critical (5)', class: styles.critical },
    { id: '4', name: 'High (4)', class: styles.high },
    { id: '3', name: 'Medium (3)', class: styles.medium },
    { id: '2', name: 'Low (2)', class: styles.low },
    { id: '1', name: 'Info (1)', class: styles.info },
  ];

  // Get the class for the current severity level
  const getSeverityClass = () => {
    if (selectedSeverity === 'all') return '';
    const level = severityLevels.find(level => level.id === selectedSeverity);
    return level ? level.class : '';
  };

  return (
    <div
      className={`${styles.filterContainer} ${styles.severityContainer} ${selectedSeverity !== 'all' ? styles.active : ''}`}
    >
      {selectedSeverity !== 'all' && (
        <div className={`${styles.severityIcon} ${getSeverityClass()}`}></div>
      )}
      <label htmlFor="severity-filter" className={styles.filterLabel}>
        Filter by Severity:
      </label>
      <select
        id="severity-filter"
        className={`${styles.filterSelect} ${selectedSeverity !== 'all' ? styles.severitySelect : ''}`}
        value={selectedSeverity}
        onChange={e => onSeverityChange(e.target.value)}
        aria-label="Select severity level"
      >
        {severityLevels.map(level => (
          <option key={level.id} value={level.id}>
            {level.name}
          </option>
        ))}
      </select>
    </div>
  );
}
