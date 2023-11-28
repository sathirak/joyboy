const mysql = require("mysql2");

const conn_keiko_data = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: "keiko_data",
	authPlugins: {
		mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD + "\0"),
	},
	multipleStatements: true,
});

module.exports = {conn_keiko_data};
