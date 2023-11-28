const mysql = require("mysql2");

const conn_moby_user = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: "moby_user",
	authPlugins: {
		mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD + "\0"),
	},
	multipleStatements: true,
});

const conn_notice_board = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: "notice_board",
	authPlugins: {
		mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD + "\0"),
	},
	multipleStatements: true,
});

module.exports = {conn_moby_user, conn_notice_board};
