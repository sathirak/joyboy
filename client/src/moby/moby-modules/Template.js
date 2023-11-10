import { useState, useEffect } from "react";
import React from 'react';



function Template() {

  return (
    <div className='Moby Moby-Container Moby-Container-Column'>
      <h1 className='Moby-Heading'>Template<div className='Moby-Line-Thick'></div><div className='Moby-Line-Thin'></div></h1>
      <h2 className='Moby-Heading'>Heading H2</h2>
      <h3 className='Moby-Heading'>Heading H3</h3>
      <h4 className='Moby-Heading'>Heading H4</h4>
      <h5 className='Moby-Heading'>Heading H5</h5>
      <h6 className='Moby-Heading'>Heading H6</h6>
      <div className='Moby-Widget-Container'>
        <div className='Moby-Paragraph'>This is a paragraph inside a Widget Container<a href='#unvisited' className='Moby-Link'>This is a unvisited link inside the paragraph</a></div>
        <a href='/moby' className='Moby-Link'>This is a visited link but outside the paragraph</a>
        <div className='Moby-Button'>This is a button</div>
        <div className='Moby-Button Moby-Button-Disabled' aria-label='This Button is disabled'>This is a Disabled button</div>
        <h4 className='Moby-Heading'>This is a the Dropdown component</h4>
        <Dropdown />
      </div>
      <div className='Moby-Success'>This is a success message :)</div>
      <div className='Moby-Warn'>This is a warning :|</div>
      <div className='Moby-Error'> This is an error :(</div>
      <div className='Moby-Disabled'>This is a disabled message x(</div>

      <div className="Moby-Spacer" style={{ height: 'clamp(20px, 4vh, 50px)' }}></div>
      <h4 className='Moby-Heading'>This is a the Tab component and on top of this div there's a spacer</h4>
      <Tab />
      <div className="Moby-Spacer" style={{ height: 'clamp(50px, 8vh, 100px)' }}></div>
      <Popup
        trigger={
          <div className='Moby-Button'>See a popup</div>
        }
        content={
          <div className='Moby-Warn'>This is a warning as a popup! </div>
        }
        closebutton={true}
      />
      <Popup
        trigger={
          <div className='Moby-Button'>See a popup error</div>
        }
        content={
          <div className='Moby-Error'>This is an error as a popup! and you cant close it! </div>
        }
        closebutton={false}
      />
    </div>
  );
}

function Tab() {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabLink = (index) => {
    setActiveTab(index);
  };

  const tabs = ['Tab A', 'Tab B', 'Tab C', 'Tab D', 'Tab E'];

  return (
    <div className='Moby-Tab'>
      <div className='Moby-Tab-Link-Container'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`Moby-Tab-Link ${index === activeTab ? 'Moby-Tab-Link-Active' : ''}`}
            onClick={() => handleTabLink(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className='Moby-Tab-Content'>
        {tabs[activeTab] === 'Tab A' && <div>This is the content for Tab A</div>}
        {tabs[activeTab] === 'Tab B' && <div>This is the content for Tab B</div>}
        {tabs[activeTab] === 'Tab C' && <div>This is the content for Tab C</div>}
        {tabs[activeTab] === 'Tab D' && <div>This is the content for Tab D</div>}
        {tabs[activeTab] === 'Tab E' && <div>This is the content for Tab E</div>}
      </div>
    </div>
  );
}


import Dropdown_Arrow from "../moby-icons/dropdown.svg";

function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);
  const dropdownOptions = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'];

  const handleDropDownOption = (dropdownOption) => {
    setSelectedDropdownOption(dropdownOption);
    setIsDropdownOpen(false);
    alert(dropdownOption);
  };

  useEffect(() => {
    function handleBodyClick(event) {
      if (isDropdownOpen && !event.target.closest('.Moby-Dropdown')) {
        setIsDropdownOpen(false);
      }
    }

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [isDropdownOpen]);

  return (
    <div className="Moby-Dropdown">
      <div className="Moby-Dropdown-Heading" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <h4 className='Moby-Icon-Block'>
          Dropdown Title <img
            src={Dropdown_Arrow}
            className="Moby-Icon-Small"
            alt="Arrow"
            style={{ transform: isDropdownOpen ? 'rotate(-180deg)' : 'none' }}
          />
        </h4>
      </div>
      {isDropdownOpen && (
        <div className="Moby-Dropdown-List">
          {dropdownOptions.map((dropdownOption, index) => (
            <div key={index} className="Moby-Dropdown-Option" onClick={() => handleDropDownOption(dropdownOption)} >
              {dropdownOption}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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


export default Template;