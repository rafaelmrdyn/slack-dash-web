'use client';

import { useState } from 'react';
import Image from 'next/image';
import TabNavigation from './TabNavigation';
import MessagesList from './MessagesList';
import ThemeToggle from './ThemeToggle';
import DepartmentFilter from './DepartmentFilter';
import SeverityFilter from './SeverityFilter';
import SearchFilter from './SearchFilter';
import { useTheme } from '../context/ThemeContext';
import { TABS, DEPARTMENTS, SEVERITY_DETAILS } from '../constants/enums';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(TABS.ALERTS);
  const [selectedDepartment, setSelectedDepartment] = useState(DEPARTMENTS.ALL);
  const [selectedSeverity, setSelectedSeverity] = useState(SEVERITY_DETAILS.ALL.id);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  const isActiveAlertsTab = activeTab === TABS.ALERTS;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logoContainer}>
            <Image
              src={theme === 'light' ? '/images/logo-light.svg' : '/images/logo.svg'}
              alt="CoinStats Logo"
              className={styles.logo}
              width={150}
              height={40}
            />
          </div>
          <div className={styles.themeToggleContainer}>
            <ThemeToggle />
          </div>
        </div>
        <h1 className={styles.title}>Slack Monitor Dashboard</h1>
        <p className={styles.description}>
          Track and manage key communications and alerts across your Slack workspace
        </p>
      </header>

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.filterSection}>
        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        {!isActiveAlertsTab && (
          <DepartmentFilter
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
          />
        )}
        <SeverityFilter
          selectedSeverity={selectedSeverity}
          onSeverityChange={setSelectedSeverity}
        />
      </div>

      <main className={styles.content}>
        <MessagesList
          type={activeTab}
          selectedDepartment={selectedDepartment}
          selectedSeverity={selectedSeverity}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
}
