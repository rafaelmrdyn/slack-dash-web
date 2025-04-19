'use client';

import styles from './SearchFilter.module.css';

export default function SearchFilter({ searchTerm, onSearchChange }) {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div
      className={`${styles.filterContainer} ${styles.searchContainer} ${searchTerm ? styles.active : ''}`}
    >
      <div className={styles.searchIcon}>🔍</div>
      <div className={styles.search}>
        <label htmlFor="search-filter" className={styles.filterLabel}>
          Search:
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="search-filter"
            type="text"
            className={styles.searchInput}
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Enter search term..."
            aria-label="Search term"
          />
          {searchTerm && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
