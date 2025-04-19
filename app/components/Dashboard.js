'use client';

import { useState } from 'react';
import Image from 'next/image';
import TabNavigation from './TabNavigation';
import AlertsList from './AlertsList';
import SupportMessagesList from './SupportMessagesList';
import ThemeToggle from './ThemeToggle';
import DepartmentFilter from './DepartmentFilter';
import SeverityFilter from './SeverityFilter';
import TagsFilter from './TagsFilter';
import { useTheme } from '../context/ThemeContext';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const { theme } = useTheme();

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
        <DepartmentFilter
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
        />
        <SeverityFilter
          selectedSeverity={selectedSeverity}
          onSeverityChange={setSelectedSeverity}
        />
        <TagsFilter selectedTag={selectedTag} onTagChange={setSelectedTag} />
      </div>

      <main className={styles.content}>
        {activeTab === 'alerts' ? (
          <AlertsList
            selectedDepartment={selectedDepartment}
            selectedSeverity={selectedSeverity}
            selectedTag={selectedTag}
          />
        ) : (
          <SupportMessagesList
            selectedDepartment={selectedDepartment}
            selectedSeverity={selectedSeverity}
          />
        )}
      </main>
    </div>
  );
}
