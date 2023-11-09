import React, { useState, useEffect } from "react";

function TableDetails({ tableName }) {
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		async function fetchTableDetails() {
			try {
				const response = await fetch(`http://localhost:5000/api/tables/${tableName}`);
				if (response.ok) {
					const data = await response.json();
					setTableData(data);
				} else {
					console.error(`Error fetching table details for ${tableName}`);
				}
			} catch (error) {
				console.error(`Error fetching table details for ${tableName}:`, error);
			}
		}

		fetchTableDetails();
	}, [tableName]);

	const renderTableHeaders = () => {
		if (tableData.length === 0) {
			return null;
		}

		const headers = Object.keys(tableData[0]);
		return (
			<div className="Table-Header">
				{headers.map((header, index) => (
					<div key={index} className="Table-Header-Cell">
						{header}
					</div>
				))}
			</div>
		);
	};

	const renderTableRows = () => {
        let cellPath = '/inspect/';

		return (
			<div className="Table-Rows">
				{tableData.map((row, index) => (
					<div key={index} className="Table-Row">
						{Object.values(row).map((value, subIndex) => (
							<div key={subIndex} className="Table-Cell">
								<a href={cellPath + value} target="_blank">
									{value}
								</a>
							</div>
						))}
					</div>
				))}
			</div>
		);
	};

	return (
		<div>
			<h3>{tableName}</h3>
			<div className="Table">
				{renderTableHeaders()}
				{renderTableRows()}
			</div>
		</div>
	);
}

function Breadboard() {
	const [tables, setTables] = useState([]);
	const [selectedTable, setSelectedTable] = useState(null);

	const handleShowTables = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/tables");
			if (response.ok) {
				const data = await response.json();
				setTables(data);
			} else {
				console.error("Error fetching tables");
			}
		} catch (error) {
			console.error("Error fetching tables:", error);
		}
	};

	const handleTableClick = (tableName) => {
		setSelectedTable(tableName);
	};

	return (
		<div>
			<h1>Breadboard</h1>

			{tables.length > 0 && (
				<ul>
					{tables.map((tableName, index) => (
						<li key={index} onClick={() => handleTableClick(tableName)} className="Core-Tabs">
                            {tableName}
						</li>
					))}
				</ul>
			)}

			{selectedTable && <TableDetails tableName={selectedTable} />}
			<div className="Moby-Button" onClick={handleShowTables}>
				Tables!
			</div>
		</div>
	);
}

export default Breadboard;
