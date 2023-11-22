const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

router.use(express.json());

router.get('/', (req, res) => {
  res.send('Welcome to the Top Board!');
});

const conn_headliners = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "headliners",
};

const pool = mysql.createPool(conn_headliners);

const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(connection);
    });
  });
};


router.get('/tables', async (req, res) => {
  console.log('topboard/tables has been requested');
  try {
    const connection = await getConnection();

    connection.query('SHOW TABLES', (error, results) => {
      connection.release();

      if (error) {
        console.error('Error fetching tables:', error);
        res.status(500).json({ error: 'Error fetching tables' });
      } else {
        const tableNames = results.map((row) => row['Tables_in_headliners']);
        console.log(tableNames);
        res.json(tableNames);
      }
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Error connecting to the database' });
  }
});


router.get('/tables/:tableName', async (req, res) => {
  console.log('topboard/tables/:tableName has been requested');
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


router.post('/query', async (req, res) => {
  console.log('topboard/query has bee requested');
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

module.exports = router;