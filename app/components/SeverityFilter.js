'use client';

import { SEVERITY, SEVERITY_DETAILS } from '../constants/enums';
import styles from './SeverityFilter.module.css';

export default function SeverityFilter({ selectedSeverity, onSeverityChange }) {
  const severityLevels = [
    SEVERITY_DETAILS.ALL,
    { ...SEVERITY_DETAILS[SEVERITY.CRITICAL], class: styles.critical },
    { ...SEVERITY_DETAILS[SEVERITY.HIGH], class: styles.high },
    { ...SEVERITY_DETAILS[SEVERITY.MEDIUM], class: styles.medium },
    { ...SEVERITY_DETAILS[SEVERITY.LOW], class: styles.low },
    { ...SEVERITY_DETAILS[SEVERITY.INFO], class: styles.info },
  ];

  // Get the class for the current severity level
  const getSeverityClass = () => {
    if (selectedSeverity === SEVERITY_DETAILS.ALL.id) return '';
    const level = severityLevels.find(level => level.id === selectedSeverity);
    return level ? level.class : '';
  };

  return (
    <div
      className={`${styles.filterContainer} ${styles.severityContainer} ${selectedSeverity !== SEVERITY_DETAILS.ALL.id ? styles.active : ''}`}
    >
      {selectedSeverity !== SEVERITY_DETAILS.ALL.id && (
        <div className={`${styles.severityIcon} ${getSeverityClass()}`}></div>
      )}
      <label htmlFor="severity-filter" className={styles.filterLabel}>
        Filter by Severity:
      </label>
      <select
        id="severity-filter"
        className={`${styles.filterSelect} ${selectedSeverity !== SEVERITY_DETAILS.ALL.id ? styles.severitySelect : ''}`}
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
