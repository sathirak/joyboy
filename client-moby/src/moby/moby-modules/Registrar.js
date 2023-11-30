import React, { useState } from 'react';
import MobyAlert from '../moby-components/Moby_Alert';

const Registrar = () => {
  const [uname, setUname] = useState('');
  const [pw, setPw] = useState('');
  const [type, setType] = useState('');

  const [isUser, setIsUser] = useState(null);

  const [alert_signal, set_alert_signal] = useState(false);
  const [alert_message, set_alert_message] = useState(false);
  const [alert_type, set_alert_type] = useState(false);

  const alert_switch = () => {
    set_alert_signal(false);
  }

  const handleCheckUsername = async (value) => {

    setUname(value);

    set_alert_signal(false);

    if (value.trim() !== '') {
      try {
        const response = await fetch(`/hyperion/check/${value}`);
        const data = await response.json();

        setIsUser(data.exists);

        if (data.exists === true) {

          set_alert_message('A user with this username is already registered');
          set_alert_type('Warn');
          set_alert_signal(true);

        } else if (data.exists === false) {

          set_alert_message('Username is available');
          set_alert_type('Success');
          set_alert_signal(true);

        }

      } catch (error) {

        console.error('Error:', error);

        set_alert_message('An error occured, please check your network connection :(');
        set_alert_type('Error');
        set_alert_signal(true);

      }
    }
  };

  const handleRegister = async () => {

    console.log({ uname, pw, type });

    try {
      const response = await fetch('/hyperion/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uname, pw, type }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <MobyAlert signal={alert_signal} message={alert_message} type={alert_type} closeable={true} close_funct={alert_switch} />
      <h1 className='Moby-Heading'>Registrar</h1>

      <div className='Moby-Container Moby-Container-Row' >

        <div className='Moby-Widget-Container'>
          <h3 className='Moby-Heading'>Moby Account Registration</h3>

          <h5 className='Moby-Heading'>Username{isUser !== null && (<>{isUser ? 'username is not available ✕' : 'username is available ✓'}</>)}</h5>
          <input className='Moby-StrInput' type="text" value={uname} onChange={(e) => handleCheckUsername(e.target.value)} />
          <h5 className='Moby-Heading'>Password</h5>
          <input className='Moby-StrInput' type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
          <h5 className='Moby-Heading'>User Type</h5>
          <input className='Moby-StrInput' type="text" value={type} onChange={(e) => setType(e.target.value)} />

        </div>

        <div className='Moby-Widget-Container'>
          <h3 className='Moby-Heading'>Registration Details</h3>

          <div className='Moby-Paragraph'>
              <div className='Moby-Paragraph'>{'Username => ' + uname }</div>
              <div className='Moby-Paragraph'>{'Password => ' + pw }</div>

          </div>

          <div className='Moby-Button' onClick={handleRegister}>Register</div>
        </div>

      </div>

    </div>
  );
};

export default Registrar;
