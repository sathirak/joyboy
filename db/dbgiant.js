const express = require('express');
const getConnection = require('./db');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/tables', async (req, res) => {
  try {
    const connection = await getConnection();

    connection.query('SHOW TABLES', (error, results) => {
      connection.release();

      if (error) {
        console.error('Error fetching tables:', error);
        res.status(500).json({ error: 'Error fetching tables' });
      } else {
        const tableNames = results.map((row) => row['Tables_in_homepage']);
        console.log(tableNames);
        res.json(tableNames);
      }
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Error connecting to the database' });
  }
});


app.get('/api/tables/:tableName', async (req, res) => {
  try {
    const connection = await getConnection();
    const tableName = req.params.tableName;
    const query = `SELECT * FROM ${tableName}`;
    
    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error(`Error fetching table details for ${tableName}:`, error);
        res.status(500).json({ error: `Error fetching table details for ${tableName}` });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Error connecting to the database' });
  }
});


app.post('/api/query', async (req, res) => {
  try {
    const { query } = req.body;
    console.log(query);
    const connection = await getConnection();
    
    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error executing query:', error);
        res.json(error);
        res.status(500).json({ error: 'Error executing query' });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.json(error);
    res.status(500).json({ error: 'Error connecting to the database' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
