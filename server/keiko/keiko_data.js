const express = require('express');
const router = express.Router();

const {conn_keiko_data} = require('../database');

router.get('/output/:keikodex', async (req, res) => {
    const { keikodex } = req.params;
  
    try {
      const query = 'SELECT * FROM keiko_minor WHERE keikodex = ?';
      const rows = await conn_keiko_data.query(query, [keikodex]);
  
      console.log(rows);
      res.json(rows);
    } catch (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: 'Error retrieving data' });
    }
  });
  
module.exports = router;