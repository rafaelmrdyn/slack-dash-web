'use client';

import { useState, useEffect } from 'react';
import SupportMessageCard from './SupportMessageCard';
import { fetchSupportMessages, setupPolling } from '../services/apiService';
import styles from './SupportMessagesList.module.css';
import useDebounce from '@/app/hooks/useDebounce';

export default function SupportMessagesList({
  selectedDepartment,
  selectedSeverity,
  searchTerm = '',
}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const debouncedInputValue = useDebounce(searchTerm.trim(), 500);
  useEffect(() => {
    // Set up polling for real-time updates
    setLoading(true);

    // Create a function that passes the search term to fetchSupportMessages
    const fetchMessagesWithSearch = () => fetchSupportMessages(debouncedInputValue);
    const cleanup = setupPolling(
      fetchMessagesWithSearch,
      data => {
        setMessages(data);
        setLoading(false);
      },
      30000
    ); // Poll every 30 seconds

    // Clean up the interval when the component unmounts
    return cleanup;
  }, [debouncedInputValue]); // Re-run effect when search term changes

  if (loading) {
    return <div className={styles.loading}>Loading messages</div>;
  }

  // Filter messages based on selected department and severity
  let filteredMessages = messages;

  // Apply department filter
  if (selectedDepartment !== 'all') {
    filteredMessages = filteredMessages.filter(
      message => message.department === selectedDepartment
    );
  }

  // Apply severity filter
  if (selectedSeverity !== 'all') {
    filteredMessages = filteredMessages.filter(
      message => message.importance === parseInt(selectedSeverity)
    );
  }

  if (filteredMessages.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No messages</h3>
        <p>
          {messages.length === 0
            ? 'There are no support messages at this time.'
            : selectedDepartment !== 'all' && selectedSeverity !== 'all'
              ? `There are no severity ${selectedSeverity} support messages for the ${selectedDepartment} department.`
              : selectedSeverity !== 'all'
                ? `There are no severity ${selectedSeverity} support messages.`
                : `There are no support messages for the ${selectedDepartment} department.`}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.messagesList}>
      <div className={styles.messagesHeader}>
        <h2>Support Messages</h2>
        <div className={styles.messagesInfo}>
          <span className={styles.messagesCount}>
            {filteredMessages.length}{' '}
            {selectedDepartment !== 'all' && selectedSeverity !== 'all'
              ? `${selectedDepartment} severity ${selectedSeverity} `
              : selectedSeverity !== 'all'
                ? `severity ${selectedSeverity} `
                : selectedDepartment !== 'all'
                  ? `${selectedDepartment} `
                  : ''}
            messages
          </span>
        </div>
      </div>

      <div className={styles.messagesDescription}>
        <p>Messages from support channels. Sorted by importance (highest first).</p>
      </div>

      <div className={styles.messagesGrid}>
        {filteredMessages.map(message => (
          <SupportMessageCard key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
