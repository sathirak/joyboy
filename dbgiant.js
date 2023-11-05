const { connectWire, disconnectWire } = require('./db');
const cors = require('cors');

const express = require('express');
const app = express();
const db = require('./db');

app.use(cors());

app.post('/api/disconnect', (req, res) => {
    disconnectWire();
    res.json({ message: 'Database connection disconnected' });
  });
  
app.post('/api/connect', (req, res) => {
connectWire()
    .then(() => {
    res.json({ message: 'Connected to MySQL' });
    })
    .catch((err) => {
    res.status(500).json({ error: 'Failed to connect to MySQL' });
    });
});

app.get('/api/tables', (req, res) => {
    db.connection.query('SHOW TABLES', (err, results) => {
      if (err) {
        console.error('Error fetching tables:', err);
        res.status(500).json({ error: 'Failed to fetch tables' });
      } else {
        const tables = results.map((result) => result[Object.keys(result)[0]]);
        
        console.log('Tables:', tables);
  
        res.json(tables);
      }
    });
  });
  

app.listen(8001, () => {
  console.log('Server is running on port 8001');
});
