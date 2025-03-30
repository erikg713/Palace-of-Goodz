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
interface DataType {
  // define the structure based on the expected data
  id: number;
  name: string;
  // Add other fields as necessary
}

const [data, setData] = useState<DataType | null>(null);
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const result = await response.json();
    setData(result);
  } catch (err: any) {
    setError(`Failed to fetch data: ${err.message}`);
  }
};
const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await fetch('https://api.example.com/data');
    const result = await response.json();
    setData(result);
  } catch (err: any) {
    setError(`Failed to fetch data: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

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
      <div>Loading...</div>
    )}
  </div>
);
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
