'use client';

import styles from './TagsFilter.module.css';
import { mockAlerts } from './mockData';

export default function TagsFilter({ selectedTag, onTagChange }) {
  // Extract all unique tags from the alerts
  const getAllTags = () => {
    const tagsSet = new Set();
    mockAlerts.forEach(alert => {
      if (alert.tags && Array.isArray(alert.tags)) {
        alert.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet).sort();
  };

  const allTags = getAllTags();

  // Create tag options with "All Tags" as the first option
  const tagOptions = [
    { id: 'all', name: 'All Tags' },
    ...allTags.map(tag => ({
      id: tag,
      name: tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' '),
      class: styles[tag.replace(/-/g, '')] || styles.defaultTag,
    })),
  ];

  // Get the class for the current tag
  const getTagClass = () => {
    if (selectedTag === 'all') return '';
    const tag = tagOptions.find(tag => tag.id === selectedTag);
    return tag ? tag.class : '';
  };

  return (
    <div
      className={`${styles.filterContainer} ${styles.tagContainer} ${selectedTag !== 'all' ? styles.active : ''}`}
    >
      {selectedTag !== 'all' && <div className={`${styles.tagIcon} ${getTagClass()}`}>#</div>}
      <label htmlFor="tag-filter" className={styles.filterLabel}>
        Filter by Tag:
      </label>
      <select
        id="tag-filter"
        className={`${styles.filterSelect} ${selectedTag !== 'all' ? styles.tagSelect : ''}`}
        value={selectedTag}
        onChange={e => onTagChange(e.target.value)}
        aria-label="Select tag"
      >
        {tagOptions.map(tag => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>
  );
}
