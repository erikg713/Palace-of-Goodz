import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css'; // Assuming a CSS module

interface DashboardProps {
  title: string;
}

const Dashboard: React.FC<DashboardProps> = ({ title }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>{title}</h1>
      {data ? (
        <div>{/* Render your data here */}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
