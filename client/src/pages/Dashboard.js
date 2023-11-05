import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [tables, setTables] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Connected');
  
  const disconnectDatabase = () => {
    fetch('http://localhost:8001/api/disconnect', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        setConnectionStatus(data.message);
      })
      .catch((error) => console.error('Error disconnecting from the database:', error));
  };

  const connectDatabase = () => {
    fetch('http://localhost:8001/api/connect', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        setConnectionStatus(data.message);
        // You can fetch tables or perform other actions here if neede
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error);
        setConnectionStatus('Failed to connect to MySQL');
      });
  };

  useEffect(() => {
    fetch('http://localhost:8001/api/tables')
      .then((response) => response.json())
      .then((data) => setTables(data))
      .catch((error) => console.error('Error fetching tables:', error));
  }, []);

  return (
    <div>
      <h2>List of Tables</h2>
      <button onClick={disconnectDatabase}>Disconnect from Database</button>
      <button onClick={connectDatabase}>Connect to Database</button>
      <p>{connectionStatus}</p>
      <ul>
        {tables.map((table) => (
          <li key={table}>{table}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
