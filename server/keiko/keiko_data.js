const express = require('express');
const router = express.Router();

const {conn_keiko_data} = require('../database');

router.get('/output/:keikodex', (req, res) => {
    const { keikodex } = req.params;
    console.log('Keiko Fired');
  
    const query = 'SELECT * FROM keiko_minor WHERE keikodex = ?';
    
    conn_keiko_data.query(query, [keikodex], (err, rows) => {
      if (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Error retrieving data' });
      } else {
        console.log(rows);
        res.json(rows);
      }
    });
  });
  
module.exports = router;