import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';

interface DashboardProps {
  title: string;
}

interface DataType {
  id: number;
  name: string;
}

const useFetchData = (url: string) => {
  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(`Failed to fetch data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

const Dashboard: React.FC<DashboardProps> = ({ title }) => {
  const { data, error, loading } = useFetchData('https://api.example.com/data');

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>{title}</h1>
      {data ? (
        <div>
          {/* Render your data here */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Dashboard;
