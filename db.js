const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Master',
  password: '8c7$Z9pW@q1',
  database: 'Homepage',
});

function connectWire() {
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve('Connected to MySQL');
        }
      });
    });
  }
  
  function disconnectWire() {
    connection.end();
  }
  
  module.exports = {
    connectWire,
    disconnectWire,
    connection,
  };