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
					{dropdownTitle} <img src={Dropdown_Arrow} className="Moby-Icon-Small" alt="Arrow" style={{ transform: isDropdownOpen ? "rotate(-180deg)" : "none" }} />
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

/*       <Popup
        trigger={
          <div className='Moby-Button'>See a popup error</div>
        }
        content={
          <div className='Moby-Error'>This is an error as a popup! and you cant close it! </div>
        }
        closebutton={false}
        />
        
         */

const Popup = ({ trigger, content, closebutton }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	return (
		<div className="Moby-Popup">
			<div onClick={togglePopup}>{trigger}</div>
			{isPopupOpen && (
				<div className="Moby-Popup-Content">
					<div className="Moby-Popup-Overlay"></div>
					<div className="Moby-Popup-Card">
						{closebutton && (
							<span className="Moby-Popup-Close" onClick={togglePopup}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="#2d3748" className="Moby-Icon-Small" id="Outline" viewBox="0 0 24 24" width="512" height="512">
									<path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z" />
								</svg>
							</span>
						)}
						{content}
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
      const newState = !isOn;
      setIsOn(newState);
      if (onToggle) {
        onToggle(newState);
      }
    };
  
    return (
      <div>
        <h5 className="Moby-Label">{label}</h5>
        <div className={'Moby-Toggle-Container'} onClick={handleToggle} style={{backgroundColor: `${isOn ? onColor : offColor }`}}>
          <div className={`Moby-Toggle ${isOn ? 'On' : 'Off'}`}></div>
        </div>
      </div>
    );
  };


export { Dropdown, Tab, Popup, Toggle };

export default Dropdown;
