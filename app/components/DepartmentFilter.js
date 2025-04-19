'use client';

import styles from './DepartmentFilter.module.css';
import { DEPARTMENTS, DEPARTMENT_DETAILS } from '../constants/enums';

export default function DepartmentFilter({ selectedDepartment, onDepartmentChange }) {
  const departments = [
    { id: DEPARTMENTS.ALL, name: DEPARTMENT_DETAILS[DEPARTMENTS.ALL].name },
    {
      id: DEPARTMENTS.FRONTEND,
      name: DEPARTMENT_DETAILS[DEPARTMENTS.FRONTEND].name,
      class: styles.frontend,
      icon: DEPARTMENT_DETAILS[DEPARTMENTS.FRONTEND].icon,
    },
    {
      id: DEPARTMENTS.BACKEND,
      name: DEPARTMENT_DETAILS[DEPARTMENTS.BACKEND].name,
      class: styles.backend,
      icon: DEPARTMENT_DETAILS[DEPARTMENTS.BACKEND].icon,
    },
    {
      id: DEPARTMENTS.DEVOPS,
      name: DEPARTMENT_DETAILS[DEPARTMENTS.DEVOPS].name,
      class: styles.devops,
      icon: DEPARTMENT_DETAILS[DEPARTMENTS.DEVOPS].icon,
    },
    {
      id: DEPARTMENTS.PRODUCT,
      name: DEPARTMENT_DETAILS[DEPARTMENTS.PRODUCT].name,
      class: styles.product,
      icon: DEPARTMENT_DETAILS[DEPARTMENTS.PRODUCT].icon,
    },
    {
      id: DEPARTMENTS.IOS,
      name: DEPARTMENT_DETAILS[DEPARTMENTS.IOS].name,
      class: styles.ios,
      icon: DEPARTMENT_DETAILS[DEPARTMENTS.IOS].icon,
    },
    {
      id: DEPARTMENTS.ANDROID,
      name: DEPARTMENT_DETAILS[DEPARTMENTS.ANDROID].name,
      class: styles.android,
      icon: DEPARTMENT_DETAILS[DEPARTMENTS.ANDROID].icon,
    },
    {
      id: DEPARTMENTS.MOBILE,
      name: DEPARTMENT_DETAILS[DEPARTMENTS.MOBILE].name,
      class: styles.mobile,
      icon: DEPARTMENT_DETAILS[DEPARTMENTS.MOBILE].icon,
    },
  ];

  const getDepartmentDetails = () => {
    if (selectedDepartment === DEPARTMENTS.ALL) return null;
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
