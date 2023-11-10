import React, { useState, useEffect } from "react";
import { Dropdown, Toggle } from "../Moby_Components";

function TableMaker({ tableName }) {
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
			<div className="Moby-Table-Header">
				{headers.map((header, index) => (
					<div key={index} className="Moby-Table-Header-Cell">
						{header}
					</div>
				))}
			</div>
		);
	};

	const renderTableRows = () => {
		let cellPath = "/inspect/";

		return (
			<div className="Moby-Table-Rows">
				{tableData.map((row, index) => (
					<div key={index} className="Moby-Table-Row">
						{Object.values(row).map((value, subIndex) => (
							<div key={subIndex} className="Moby-Table-Cell">
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
			<h3 className="Moby-Heading">{tableName}</h3>
			<div className="Moby-Table">
				{renderTableHeaders()}
				{renderTableRows()}
			</div>
		</div>
	);
}

function Breadboard() {
	const [selectedTable, setSelectedTable] = useState(null);
	const [dropdownOptions, setDropdownOptions] = useState([]);

	const [switchState, setSwitchState] = useState(false);

	const handleSwitchToggle = (newState) => {
		setSwitchState(newState);
	};

	const handleShowTables = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/tables");
			if (response.ok) {
				const data = await response.json();
				setDropdownOptions(data);
			} else {
				console.error("Error fetching tables");
			}
		} catch (error) {
			console.error("Error fetching tables:", error);
		}
	};

	handleShowTables();

	const handleTableClick = (tableName) => {
		setSelectedTable(tableName);
	};

	return (
		<div>
			<h1>Breadboard</h1>

			<div className="Moby-Container-Row Moby-Container-Center">
				<Dropdown dropdownOptions={dropdownOptions} dropdownTitle=" Tables" onOptionSelect={handleTableClick} />
				<Toggle label="Edit Mode" onToggle={handleSwitchToggle} onColor={"var(--moby-brand)"} offColor={"var(--moby-disable)"} />
			</div>

			{selectedTable && <TableMaker tableName={selectedTable} />}
		</div>
	);
}

export default Breadboard;
