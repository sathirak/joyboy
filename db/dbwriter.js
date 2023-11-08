const express = require("express");
const getConnection = require("./db");
const cors = require("cors");
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/write", async (req, res) => {

	const sqlquery = "SELECT joydex FROM top_all ORDER BY joypoint DESC";
	const connection = await getConnection();

	connection.query(sqlquery, (err, results, fields) => {
		connection.release();
		if (err) {
			console.error("Error executing the query: " + err.stack);
			res.status(500).json({ error: "Database query error" });
			return;
		}

		const array = results.map((row) => row.joydex);
		res.json(array);

        const jsonContent = JSON.stringify(array);  
        fs.writeFileSync('./client/src/data.json', jsonContent);

	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
