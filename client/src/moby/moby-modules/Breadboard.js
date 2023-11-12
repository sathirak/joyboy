import React, { useState, useEffect } from "react";
import { Dropdown, Toggle, TableMaker, Alert, StrInput, Popup } from "../Moby_Components";



function Breadboard() {
	const [selectedTable, setSelectedTable] = useState(null);
	const [selectedQuery, setSelectedQuery] = useState("Sort by Joypoints");
	const [activeQuery, setActiveQuery] = useState(null);
	const [dropdownOptions, setDropdownOptions] = useState([]);
	const [switchState, setSwitchState] = useState(false);
	const [inspectState, setInspectState] = useState(false);
	const [cellData, setCellData] = useState({ val: null, row: null, col: null });
	const { val, row, col } = cellData;
	const [inputValue, setInputValue] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [queryLog, setQueryLog] = useState(null);
	const querySet = [ 'Delete row', 'Replace cell', 'Add new row', 'Filter data', 'Sort by Joypoints' ];
	  

	const handleSwitchToggle = (newState) => {
		setSwitchState(newState);
	};

	const handleInspectToggle = (newState) => {
		setInspectState(newState);
	};

	const handleTableCellClick = (value, index, subIndex) => {
		if (inspectState) {
			alert('State is being inspected!');
		}
		setCellData({ val: value, row: index, col: subIndex });
	};
	

	  useEffect(() => {
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
    }, []);

	const handleTableClick = (tableName) => {
		setSelectedTable(tableName);
	};

	const handleQueryClick = (query) => {
		setSelectedQuery(query);
	};

	const queryMaster = (query) => {
		setIsPopupOpen(false);

		fetch('http://localhost:5000/api/query', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query: inputValue }),
		  })
			.then(response => response.text())
			.then(data => {
			  setQueryLog(data);
			})
			.catch(error => {
			  console.error('Error:', error);
			});

			setSelectedTable(null);

	};

	

    const handleInput = (value) => {

		const inputElement = document.getElementById('queryInput');
        if (inputElement && inputElement.value !== null) {
            setInputValue(inputElement.innerHTML);
			setIsPopupOpen(true);
        }
        
    };

	const closePopup = () => {
	  setIsPopupOpen(false);
	};

	return (
		<>
			<h1 className="Moby-Heading">Breadboard</h1>
			<div className='Moby-Widget-Container'>
				<div className='Moby-Paragraph'>Breadboard is the management tool for the static database.You can view the tables in the static database and edit them here</div>
			</div>
			<div className="Moby-Container-Row Moby-Container-Center Moby-Container-Between">
				<Dropdown dropdownOptions={dropdownOptions} dropdownTitle=" Tables" onOptionSelect={handleTableClick} />

				{val && (
				<div className="Moby-Container-Row Moby-Container-Around">
					<div className="Moby-Table-Active" style={{minWidth: '150px'}} title="Value of the Cell">{val}</div>
					<div className="Moby-Table-Active" style={{width: '50px'}} title="Row Number"> {row}</div>
					<div className="Moby-Table-Active" style={{width: '50px'}} title="Column Number"> {col}</div>
					<div className="Moby-Table-Active" title="Table Name">{selectedTable}</div>
				</div>)}

				<Toggle label="Query Lock" onToggle={handleSwitchToggle} onColor={"var(--moby-warn)"} offColor={"var(--moby-disable)"} />

			</div>

			{val && (<div className=" Moby-Widget-Container Moby-Container-Row Moby-Container-Center Moby-Container-Around " style={{width: 'auto'}}>
				<Toggle label="Inspect Lock" onToggle={handleInspectToggle} onColor={"var(--moby-primary-light)"} offColor={"var(--moby-disable)"} />
				<div className='Moby-Button'>{'Inspect Column ' + col}</div></div>)}

			{switchState && (
			<div className=" Moby-Widget-Container Moby-Container-Row Moby-Container-Center Moby-Container-Around " style={{width: 'auto'}}>
				<StrInput id="queryInput" placeholder="Manually type Queries or Select a Query" model="blue" isTextArea={true} type="text" enter={true} max={500} width={"400px"} help={ "MySQL Query  ⇒ " + selectedQuery} />
				<Dropdown dropdownOptions={querySet} dropdownTitle="MySQL Query" onOptionSelect={handleQueryClick} />
				<Popup isOpen={isPopupOpen} closePopup={closePopup} closebutton={true}> 
					<div className='Moby-Warn Moby-Container-Column'>You sure you want to run this MySQL Query?
						<div className='Moby-Alert-Paragraph Moby-Container'>{inputValue}</div>
						<div className="Moby-Button-Special" onClick={queryMaster} >Run Query</div>
					</div>
				</Popup>
					<div className="Moby-Icon-Wrapper" style={{borderColor: selectedQuery !== null ? "var(--moby-brand)" : 'transparent'}} onClick={handleInput}>
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" width="512"
					height="512" style={{  }} className="Moby-Icon-Medium Moby-Icon-Dark" >
						<g>
							<path
							style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
							d="M5.457,4.257c-0.277,0-0.472,0.033-0.669,0.082v0.033H4.82   c0.132,0.261,0.36,0.441,0.522,0.67c0.131,0.261,0.246,0.521,0.376,0.783C5.734,5.808,5.75,5.791,5.75,5.791   c0.23-0.162,0.344-0.424,0.344-0.816C5.996,4.86,5.98,4.747,5.898,4.632C5.8,4.469,5.588,4.388,5.457,4.257L5.457,4.257z"
							/>
							<path
							style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
							d="M22.107,18.442c-1.307-0.033-2.318,0.098-3.167,0.457   c-0.245,0.098-0.636,0.098-0.67,0.408c0.131,0.13,0.147,0.342,0.262,0.523c0.196,0.326,0.537,0.766,0.848,0.996   c0.343,0.261,0.686,0.521,1.045,0.75c0.636,0.393,1.355,0.621,1.974,1.013c0.36,0.228,0.718,0.522,1.079,0.767   c0.179,0.13,0.292,0.343,0.521,0.424V23.73c-0.115-0.146-0.147-0.359-0.261-0.523c-0.163-0.162-0.327-0.31-0.49-0.472   c-0.474-0.637-1.062-1.191-1.697-1.648c-0.523-0.36-1.666-0.85-1.877-1.452c0,0-0.017-0.017-0.033-0.033   c0.359-0.033,0.784-0.164,1.127-0.263c0.554-0.146,1.06-0.113,1.631-0.26c0.262-0.066,0.523-0.148,0.785-0.228v-0.148   c-0.295-0.293-0.506-0.686-0.817-0.963c-0.832-0.718-1.747-1.419-2.693-2.008c-0.507-0.327-1.16-0.538-1.699-0.816   
							c-0.195-0.098-0.521-0.146-0.636-0.311c-0.294-0.359-0.458-0.832-0.67-1.257c-0.473-0.897-0.931-1.892-1.338-2.84   c-0.294-0.636-0.473-1.272-0.832-1.86c-1.682-2.775-3.51-4.456-6.317-6.105C7.579,2.2,6.861,2.053,6.094,1.874   C5.685,1.856,5.278,1.825,4.87,1.809C4.608,1.694,4.346,1.384,4.118,1.237c-0.931-0.587-3.329-1.86-4.015-0.179   c-0.441,1.062,0.653,2.106,1.029,2.645c0.277,0.375,0.637,0.8,0.832,1.224C2.078,5.204,2.11,5.498,2.225,5.791   c0.261,0.718,0.505,1.518,0.849,2.188C3.253,8.322,3.449,8.682,3.677,8.99c0.132,0.181,0.36,0.261,0.409,0.556   C3.858,9.872,3.84,10.362,3.71,10.77c-0.587,1.845-0.359,4.13,0.474,5.484c0.261,0.408,0.881,1.306,1.714,0.963   
							c0.734-0.293,0.571-1.224,0.783-2.039c0.049-0.197,0.016-0.327,0.114-0.457v0.033c0.228,0.456,0.457,0.896,0.67,1.355   c0.506,0.799,1.387,1.632,2.123,2.186c0.391,0.295,0.701,0.8,1.191,0.98v-0.049h-0.032c-0.098-0.146-0.245-0.212-0.375-0.326   c-0.294-0.294-0.62-0.653-0.849-0.98c-0.685-0.914-1.29-1.926-1.828-2.971c-0.262-0.507-0.49-1.062-0.702-1.567   c-0.098-0.195-0.098-0.49-0.261-0.587c-0.246,0.359-0.604,0.669-0.783,1.109c-0.31,0.703-0.343,1.568-0.458,2.466   
							c-0.065,0.017-0.032,0-0.065,0.032c-0.522-0.13-0.701-0.669-0.898-1.125c-0.489-1.16-0.572-3.021-0.147-4.36   
							c0.114-0.342,0.605-1.419,0.408-1.746C4.689,8.859,4.363,8.682,4.184,8.436c-0.212-0.31-0.442-0.701-0.587-1.045   
							c-0.392-0.914-0.589-1.926-1.012-2.84c-0.196-0.425-0.54-0.866-0.816-1.257C1.458,2.853,1.115,2.543,0.87,2.021   
							c-0.081-0.18-0.195-0.474-0.065-0.669c0.032-0.131,0.098-0.18,0.229-0.213C1.245,0.96,1.85,1.188,2.061,1.286   
							C2.666,1.53,3.172,1.76,3.677,2.102c0.229,0.164,0.474,0.474,0.767,0.556h0.343c0.522,0.113,1.11,0.032,1.6,0.179   
							c0.864,0.277,1.648,0.685,2.35,1.126c2.138,1.355,3.901,3.282,5.092,5.583c0.196,0.375,0.279,0.718,0.458,1.109   
							c0.343,0.802,0.768,1.618,1.11,2.4c0.343,0.767,0.67,1.55,1.16,2.188c0.244,0.342,1.224,0.522,1.665,0.702   
							c0.326,0.146,0.832,0.277,1.126,0.456c0.555,0.342,1.109,0.735,1.632,1.111C21.241,17.708,22.058,18.115,22.107,18.442   
							L22.107,18.442z"
							/>
						</g>
						</svg>
					</div>

			</div>)}
			{queryLog &&  (<div className=" Moby-Container-Column Moby-Container-Center" >
							<div className=" Moby-Error-Log" >{queryLog}</div>
							</div>)}
			{selectedTable &&  <TableMaker tableName={selectedTable} onTableCellClick={handleTableCellClick} />}

		</>
	);
}

export default Breadboard;
