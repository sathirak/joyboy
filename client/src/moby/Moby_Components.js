import React from "react";
import { useState, useEffect } from "react";
import Dropdown_Arrow from "./moby-icons/dropdown.svg";

/*const dropdownOptions = ['Option R', 'Option B', 'Option C', 'Option D', 'Option E'];
const [selectedOption, setSelectedOption] = useState(null);

<Dropdown dropdownOptions={dropdownOptions} dropdownTitle=" Dropdown Title" onOptionSelect={handleDropdownClick} />
These are the needs for the components */

function Dropdown({ dropdownOptions, dropdownTitle, onOptionSelect }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleDropDownOption = (dropdownOption) => {
		onOptionSelect(dropdownOption);
		setIsDropdownOpen(false);
	};

	useEffect(() => {
		function handleBodyClick(event) {
			if (isDropdownOpen && !event.target.closest(".Moby-Dropdown")) {
				setIsDropdownOpen(false);
			}
		}

		document.body.addEventListener("click", handleBodyClick);

		return () => {
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, [isDropdownOpen]);

	return (
		<div className="Moby-Dropdown">
			<div className="Moby-Dropdown-Heading" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
				<h4 className="Moby-Icon-Block">
					{dropdownTitle}{" "}
					<img src={Dropdown_Arrow} className="Moby-Icon-Small" alt="Arrow" style={{ transform: isDropdownOpen ? "rotate(-180deg)" : "none" }} />
				</h4>
			</div>
			{isDropdownOpen && (
				<div className="Moby-Dropdown-List">
					{dropdownOptions.map((dropdownOption, index) => (
						<div key={index} className="Moby-Dropdown-Option" onClick={() => handleDropDownOption(dropdownOption)}>
							{dropdownOption}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

/*    const tabs = ['Tab A', 'Tab B', 'Tab C', 'Tab D', 'Tab E'];
        const tabContent = [
            <div>This is the content for Tab A</div>,
            <div>This is the content for Tab B</div>,
            <div>This is the content for Tab C</div>,
            <div>This is the content for Tab D</div>,
            <div>This is the content for Tab E</div>,
        ];
   */

function Tab({ tabsData }) {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabLink = (index) => {
		setActiveTab(index);
	};

	return (
		<div className="Moby-Tab">
			<div className="Moby-Tab-Link-Container">
				{tabsData.tabs.map((tab, index) => (
					<div key={index} className={`Moby-Tab-Link ${index === activeTab ? "Moby-Tab-Link-Active" : ""}`} onClick={() => handleTabLink(index)}>
						{tab}
					</div>
				))}
			</div>
			<div className="Moby-Tab-Content">{tabsData.content[activeTab]}</div>
		</div>
	);
}

/*       
	const [isPopupOpen, setIsPopupOpen] = useState(false);
  
	const closePopup = () => {
	  setIsPopupOpen(false);
	};

<Popup isOpen={isPopupOpen} closePopup={closePopup} closebutton={true}> 
         */


const Popup = ({ isOpen, closePopup, children, closebutton }) => {
	  
	if (!isOpen) {
	  return null;
	}
	return (
		<div className="Moby-Popup">
		{isOpen && (
			<div className="Moby-Popup-Content">
				<div className="Moby-Popup-Overlay"></div>
				<div className="Moby-Popup-Card">
					{closebutton && (
						<span className="Moby-Popup-Close" onClick={closePopup}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="#2d3748" className="Moby-Icon-Small" id="Outline" viewBox="0 0 24 24" width="512" height="512">
								<path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z" />
							</svg>
						</span>	
					)}
					{children}
				</div>
			</div>
		)}
		</div>
	);
  };



/*   const [switchState, setSwitchState] = useState(false);

  const handleSwitchToggle = (newState) => {
    setSwitchState(newState);
  };
  
  */

const Toggle = ({ label, onToggle, onColor, offColor }) => {
	const [isOn, setIsOn] = useState(false);

	const handleToggle = () => {
		setIsOn(!isOn);
		if (onToggle) {
			onToggle(!isOn);
		}
	};

	return (
		<div>
			<h5 className="Moby-Label">{label}</h5>
			<div className={"Moby-Toggle-Container"} onClick={handleToggle} style={{ backgroundColor: `${isOn ? onColor : offColor}` }}>
				<div className={`Moby-Toggle ${isOn ? "On" : "Off"}`}></div>
			</div>
		</div>
	);
};

/* <TableMaker tableName={selectedTable} onTableCellClick={handleTableCellClick} /> */

function TableMaker({ tableName, onTableCellClick }) {
	const [tableData, setTableData] = useState([]);

	const handleCellClick = (value, rowIndex, cellIndex) => {
		if (onTableCellClick) {
			onTableCellClick(value, rowIndex, cellIndex);
		}
	};

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
		return (
			<div className="Moby-Table-Rows">
				{tableData.map((row, index) => (
					<div key={index} className="Moby-Table-Row">
						{Object.values(row).map((value, subIndex) => (
							<div key={subIndex} className="Moby-Table-Cell" onClick={() => handleCellClick(value, index, subIndex)}>
								{value}
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

const Alert = ({ message, type, closeable, link }) => {
	const [showPopup, setShowPopup] = useState(true);

	const closePopup = () => {
		setShowPopup(false);
	};

	return (
		<>
			{showPopup && (
				<a className="Moby-Alert" href={link} >
					<div className={'Moby-Container-Alert ' + type }>
						{message}
						{closeable && (
							<svg onClick={closePopup} style={{ marginLeft: '20px', width: '25px', height: '25px' }} fill="#f5f5f5" className="Moby-Icon-Small"
								version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" width="512" height="512" >
								<path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256C511.847,114.678,397.322,0.153,256,0z M341.333,311.189c8.669,7.979,9.229,21.475,1.25,30.144c-7.979,8.669-21.475,9.229-30.144,1.25c-0.434-0.399-0.85-0.816-1.25-1.25L256,286.165l-55.168,55.168c-8.475,8.185-21.98,7.95-30.165-0.525c-7.984-8.267-7.984-21.373,0-29.64L225.835,256l-55.168-55.168c-8.185-8.475-7.95-21.98,0.525-30.165c-8.267-7.984-21.373-7.984,29.64,0L256,225.835l55.189-55.168c7.979-8.669,21.475-9.229,30.144-1.25c8.669,7.979,9.229,21.475,1.25,30.144c-0.399,0.434-0.816,0.85-1.25,1.25L286.165,256L341.333,311.189z" />
							</svg>
						)}
					</div>
					<div className="Moby-Alert-Overlay" ></div>
				</a>
			)}
		</>
	);
};

const StrInput = ({ id, placeholder, label, help, type, max, width, isTextArea }) => {

        return (
            <div className="">
                <h5 className="Moby-StrInput-Label">{label}</h5>
				<div id={id} contentEditable="plaintext-only" placeholder={placeholder} style={{ width: width, height: isTextArea ? 'auto' : '3.5em' }}
                className="Moby-StrInput" maxLength={max} autoComplete="off" autoCorrect="off" spellCheck="false" type={type} aria-label={label} ></div>               
				<h5 className="Moby-StrInput-Helper">{help}</h5>
            </div>
        );
    
};

export { Dropdown, Tab, Popup, Toggle, TableMaker, Alert, StrInput };

export default Dropdown;
