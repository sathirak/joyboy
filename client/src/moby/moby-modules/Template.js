import { useState } from "react";
import React from 'react';

import { Dropdown, Tab, Popup, Toggle } from "../Moby_Components";


function Template() {

  const dropdownOptions = ['Option R', 'Option B', 'Option C', 'Option D', 'Option E'];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDropdownClick = (option) => {
    setSelectedOption(option);
  };

  const tabs = ['Tab A', 'Tab B', 'Tab C', 'Tab D', 'Tab E'];
  const tabContent = [
    <div>This is the content for Tab A</div>,
    <div>This is the content for Tab B</div>,
    <div>This is the content for Tab C</div>,
    <div>This is the content for Tab D</div>,
    <div>This is the content for Tab E</div>,
  ];


  const [switchState, setSwitchState] = useState(false);

  const handleSwitchToggle = (newState) => {
    setSwitchState(newState);
  };

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
        <Dropdown dropdownOptions={dropdownOptions} dropdownTitle="Dropdown Title" onOptionSelect={handleDropdownClick} />
        <h3 className='Moby-Heading'>{selectedOption}</h3>
      </div>
      <div className='Moby-Success'>This is a success message :)</div>
      <div className='Moby-Warn'>This is a warning :|</div>
      <div className='Moby-Error'> This is an error :(</div>
      <div className='Moby-Disabled'>This is a disabled message x(</div>

      <div className="Moby-Spacer" style={{ height: 'clamp(20px, 4vh, 50px)' }}></div>
      <h4 className='Moby-Heading'>This is a the Tab component and on top of this div there's a spacer</h4>
      <Tab tabsData={{ tabs: tabs, content: tabContent }} />
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
      <Toggle label="Toggle Switch" onToggle={handleSwitchToggle} onColor={"var(--moby-error)"} offColor={"var(--moby-disable)"}/>
    </div>
  );
}

export default Template;