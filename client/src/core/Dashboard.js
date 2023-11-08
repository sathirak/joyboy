import React, { useState, useEffect } from 'react';


function TableDetails({ tableName }) {
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {

    async function fetchTableDetails() {
      try {
        const response = await fetch(`http://localhost:5000/api/tables/${tableName}`);
        if (response.ok) {
          const data = await response.json();
          setTableData(data);
        } else {
          console.error(`Error fetching table details for ${tableName}`);
        }
      } catch (error) {
        console.error(`Error fetching table details for ${tableName}:`, error);
      }
    }

    fetchTableDetails();
  }, [tableName]);

  return (
    <div>
      <h3>Table Details for {tableName}</h3>
      <ul>
        {tableData.map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
  );
}


function Dashboard() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);


  const handleShowTables = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tables');
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      } else {
        console.error('Error fetching tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const handleTableClick = (tableName) => {
    setSelectedTable(tableName);
  };

  return (
    <div>
      <button onClick={handleShowTables}>Show Tables</button>
      {tables.length > 0 && (
        <ul>
          {tables.map((tableName, index) => (
            <li key={index} onClick={() => handleTableClick(tableName)}> {index + 1}: {tableName}</li>
          ))}
        </ul>
      )}

      {selectedTable && (
        <TableDetails tableName={selectedTable} />
      )}
    </div>
  );
}

export default Dashboard;
