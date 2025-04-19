'use client';

import styles from './DepartmentFilter.module.css';

export default function DepartmentFilter({ selectedDepartment, onDepartmentChange }) {
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'frontend', name: 'Frontend', class: styles.frontend, icon: '💻' },
    { id: 'backend', name: 'Backend', class: styles.backend, icon: '🔧' },
    { id: 'devops', name: 'DevOps', class: styles.devops, icon: '🚀' },
    { id: 'product', name: 'Product', class: styles.product, icon: '📊' },
  ];

  // Get the department details for the current selection
  const getDepartmentDetails = () => {
    if (selectedDepartment === 'all') return null;
    return departments.find(dept => dept.id === selectedDepartment);
  };

  const departmentDetails = getDepartmentDetails();

  return (
    <div
      className={`${styles.filterContainer} ${styles.departmentContainer} ${selectedDepartment !== 'all' ? styles.active : ''}`}
    >
      {departmentDetails && (
        <div className={`${styles.departmentIcon} ${departmentDetails.class}`}>
          {departmentDetails.icon}
        </div>
      )}
      <label htmlFor="department-filter" className={styles.filterLabel}>
        Filter by Department:
      </label>
      <select
        id="department-filter"
        className={styles.filterSelect}
        value={selectedDepartment}
        onChange={e => onDepartmentChange(e.target.value)}
        aria-label="Select department"
      >
        {departments.map(dept => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
}
