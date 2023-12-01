import React, { useState } from 'react';
import MobyAlert from '../moby-components/Moby_Alert';
import { Dropdown} from "../moby-components/Moby_Components";

const Registrar = () => {
  const [uname, setUname] = useState('');
  const [pw, setPw] = useState('');
  const [type, setType] = useState('');

  const [active_user, set_active_user] = useState('No user selected');

  const [isUser, setIsUser] = useState(null);
  const [error_log, set_error_log] = useState(null);

  const [alert_signal, set_alert_signal] = useState(false);
  const [alert_message, set_alert_message] = useState(false);
  const [alert_type, set_alert_type] = useState(false);

  const [is_module_user, set_is_module_user] = useState(null);
  const [module_permit, set_module_permit] = useState({ module1: false, module2: false, module3: true, module4: false, module5: false, module6: false,
   module7: false, module8: false, module9: false, module10: false, module11: false, module12: false,});

  const alert_switch = () => {
    set_alert_signal(false);
  }

  const dropdownOptions = ['Human', 'Robot', 'Scraper'];

  const handleDropdownClick = (option) => {
    setType(option);
  };

  const handleCheckUsername = async (value) => {

    setUname(value);

    if (value.trim() !== '') {
      try {
        const response = await fetch(`/hyperion/check/${value}`);
        const data = await response.json();

        setIsUser(data.exists);

      } catch (error) {

        console.error('Error:', error);

        set_alert_message('An error occured, please check your network connection :(');
        set_alert_type('Error');
        set_alert_signal(true);

      }
    }
  };

  const handleRegister = async () => {

    set_alert_signal(false);

    handleCheckUsername(uname);

    if (uname === '' | null) {

      set_alert_message('Please enter a username');
      set_alert_type('Warn');
      set_alert_signal(true);

      return

    } else if (isUser === true) {

      set_alert_message('A user with this username is already registered');
      set_alert_type('Warn');
      set_alert_signal(true);

      return

    } else if ( pw === '' || null) {

      set_alert_message('Please enter a password');
      set_alert_type('Warn');
      set_alert_signal(true);

      return

    } else if ( type === '' || null) {

      set_alert_message('Please select a user type');
      set_alert_type('Warn');
      set_alert_signal(true);

      return

    }

    try {
      const response = await fetch('/hyperion/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uname, pw, type }),
      });

      if (response.ok) {

        let data = await response.json();

        console.log(data);

        data = JSON.stringify(data);

        set_error_log(data);

        set_alert_message(data);
        set_alert_type('Warn');
        set_alert_signal(true);

        
      } else {
  
        set_alert_message('Registration failed due to unknown error :(');
        set_alert_type('Warn');
        set_alert_signal(true);

      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handlePermit = () => {
    
    set_alert_message('Permissions Granted');
    set_alert_type('Warn');
    set_alert_signal(true);

  };

  const handlePermissionChange = (event) => {
    const { id, checked } = event.target;
    set_module_permit({
      ...module_permit,
      [id]: checked,
    });

    console.log(module_permit);
  };

  const handlePermissionUser = async (value) => {

    set_active_user(value);

    if (value.trim() !== '') {
      try {
        const response = await fetch(`/hyperion/check/${value}`);
        const data = await response.json();

        set_is_module_user(data.exists);

      } catch (error) {

        console.error('Error:', error);

        set_alert_message('An error occured, please check your network connection :(' + error);
        set_alert_type('Error');
        set_alert_signal(true);

      }
    }
  };

  return (
    <div>
      <MobyAlert signal={alert_signal} message={alert_message} type={alert_type} closeable={true} close_funct={alert_switch} />
      <h1 className='Moby-Heading'>Registrar</h1>

      <div className='Moby-Container-Row' >

      <div className='Moby-Widget-Container Moby-Container-Row' >

        <div className='Moby-Container Moby-Container-Stretch'>
          <h3 className='Moby-Heading'>Moby User Registration</h3>

          <input placeholder='Username' className='Moby-StrInput' type="text" value={uname} onChange={(e) => handleCheckUsername(e.target.value)} spellCheck={false} />
          <h6 className='Moby-Heading'>{isUser !== null && (<>{isUser ? (<span style={{color: 'var(--moby-error)', }}> username is not available ✕</span>) : 'username is available ✓'}</>)}</h6>

          <input placeholder='Password' className='Moby-StrInput' type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
          <Dropdown dropdownOptions={dropdownOptions} dropdownTitle="Select user model" onOptionSelect={handleDropdownClick} />

          <div className='Moby-Paragraph'>
              <div className='Moby-Paragraph'>{'Username → ' + uname }</div>
              <div className='Moby-Paragraph'>{'Password → ' + pw }</div>
              <div className='Moby-Paragraph'>{'Type → ' + type }</div>
          </div>

          <div className='Moby-Button' onClick={handleRegister}>Confirm & Register</div>
        </div>

      </div>




      </div>

      <div className='Moby-Divider'></div>

      <div className='Moby-Container Moby-Container-Row' >

      <div className='Moby-Container Moby-Container-Stretch'>
        <h3 className='Moby-Heading'>Moby User Activity</h3>

        <input placeholder='Username' className='Moby-StrInput' type="text" value={uname} onChange={(e) => handleCheckUsername(e.target.value)} spellCheck={false} />
        <h6 className='Moby-Heading'>{isUser !== null && (<>{isUser ? (<span style={{color: 'var(--moby-error)', }}> username is not available ✕</span>) : 'username is available ✓'}</>)}</h6>

        

          <div className='Moby-Mini-Container Moby-Container-Row Moby-Container-Center'>

            <h4 className='Moby-Heading'>{active_user}</h4>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" fill='var(--moby-icon-dark)' className='Moby-Icon-Small'>
              <path d="m23.737,5.48c-.131-.457-1.126-1.18-1.946-.36-.82.82-3.316,3.316-3.316,3.316-.787.787-2.074.764-2.853-.036-.799-.779-.824-2.067-.037-2.854,0,0,2.496-2.496,3.316-3.316.82-.82.097-1.815-.36-1.946-.748-.214-1.523-.308-2.317-.279-3.773.134-6.953,3.199-7.207,6.965-.045.665-.005,1.317.117,1.95.182.94-.163,1.905-.84,2.583L.87,18.906c-1.162,1.163-1.155,3.059-.007,4.231,1.172,1.149,3.068,1.156,4.231-.006l7.424-7.404c.677-.677,1.642-1.022,2.583-.84.633.122,1.285.162,1.95.117,3.767-.254,6.831-3.434,6.965-7.207.028-.794-.065-1.569-.279-2.317Z"/>
            </svg>

          </div>

          <div className='Moby-Container-Row' >

          <div className='Moby-Button' onClick={handleRegister}>Show All Users</div>
          <div className='Moby-Button' onClick={handleRegister}>Show Banned Users</div>

        </div>
      </div>

      </div>

      <div className='Moby-Container-Row' >

      <div className='Moby-Widget-Container Moby-Container-Stretch'>

          <h3 className='Moby-Heading'>Manage User Permissions & Allowed</h3>

          <div className='Moby-Container'>

            <div className='Moby-Container-Row'>

              <div className='Moby-Container-Column'>
                <input placeholder='Username' className='Moby-StrInput' type="text" value={active_user} onChange={(e) => {handlePermissionUser(e.target.value);} } spellCheck={false} />
                <h6 className='Moby-Heading'>{is_module_user !== null && (<>{is_module_user ? (<span style={{color: 'var(--moby-disable)', }}> user found!</span>) : (<span style={{color: 'var(--moby-error)', }}> no users found :( </span>)}</>)}</h6>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module1" name="check" checked={module_permit.module1} onChange={handlePermissionChange} />
                <label for="module1">
                  <span></span>Root Access
                </label>
              </div>              

            </div>

            <div className='Moby-Grid Moby-Grid-Col-6'>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module2" checked={module_permit.module2} onChange={handlePermissionChange} />
                <label for="module2">
                  <span></span>Shield
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module3" checked={module_permit.module3} onChange={handlePermissionChange} />
                <label for="module3">
                  <span></span>Tables
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module4" checked={module_permit.module4} onChange={handlePermissionChange} />
                <label for="module4">
                  <span></span>DB Manager
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module5" checked={module_permit.module5} onChange={handlePermissionChange} />
                <label for="module5">
                  <span></span>Analytics
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module6" checked={module_permit.module6} onChange={handlePermissionChange} />
                <label for="module6">
                  <span></span>Reports
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module7" checked={module_permit.module7} onChange={handlePermissionChange} />
                <label for="module7">
                  <span></span>Dashboard
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module8" checked={module_permit.module8} onChange={handlePermissionChange} />
                <label for="module8">
                  <span></span>Workflow
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module9" checked={module_permit.module9} onChange={handlePermissionChange} />
                <label for="module9">
                  <span></span>Notifications
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module10" checked={module_permit.module10} onChange={handlePermissionChange} />
                <label for="module10">
                  <span></span>Security
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module11" checked={module_permit.module11} onChange={handlePermissionChange} />
                <label for="module11">
                  <span></span>Settings
                </label>
              </div>

              <div class="Moby-Checkbox">
                <input type="checkbox" id="module12" checked={module_permit.module12} onChange={handlePermissionChange} />
                <label for="module12">
                  <span></span>Integrations
                </label>
              </div>

            </div>

          </div>

          <div className='Moby-Button' onClick={handlePermit}>Modify Permissions</div>
        </div>

        </div>


      {error_log && (<div className='Moby-Error-Log Moby-Container-Stretch'>{error_log}</div>) }
    </div>
  );
};

export default Registrar;
