const mysql = require('mysql2');


const dbConfig = {
  host: "localhost",
  user: "Master",
  password: "8c7$Z9pW@q1",
  database: "Homepage",
};

const pool = mysql.createPool(dbConfig);


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

module.exports = getConnection;
