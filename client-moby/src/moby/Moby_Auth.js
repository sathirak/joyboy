import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../AuthProvider';
import "./Moby.css";
import Logo from "./Moby.svg";
import MobyAlert from './moby-components/Moby_Alert';

function Auth() {

  //Authentication confirmation state from AuthProvider
  const {isAuth, fetchAuth} = useAuth();

  //username storage state
  const [user, setUser] = useState(null);

  //username confirmation state
  const [isuser, setIsUser] = useState(false);

  //passsword storage state
  const [password, setPassword] = useState(false);

  //state for the ▶ button
  const [go, setGo] = useState(false);

  //alert states to signal user for successful & unsuccessful logging in & no user found
  const [alert_message, set_alert_message] = useState(false);
  const [alert_type, set_alert_type] = useState(false);

  const navigate = useNavigate();

  const searchUser = async (value) => {

    setIsUser(false);

    try {
      const response = await fetch(`/hyperion/check/${value}`);
      const data = await response.json();
      setIsUser(data.exists);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (data.exists !== false) {
        setIsUser(true);       

      } else {
        setIsUser(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleGo = async () => {

    set_alert_signal(false);


    //If user is confirmed by searchUser and when password is entered by user
    if (user && isuser && password) {
      
      const credentials = { uname: user, pw: password };
      try {
        const response = await fetch('hyperion/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.status !== false) {
          set_alert_type('Success');
          fetchAuth();
        } else {
          set_alert_type('Warn');
        }

        set_alert_message(data.message);
        set_alert_signal(true);
        
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }

      //If user is only set by searchUser when user enters username
    } else if (isuser) {
      setGo(true);

      //When no user was found by searchUser when user enters username
    } else {

      set_alert_message('Username not found :(');
      set_alert_type('Warn');
      set_alert_signal(true);
      
    }
    
  };

  //This handles the entering of password value
  const handlePassword = (value) => {
    setPassword(value);
  }

  //This handles the enterkey
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGo();
    }
  };

  //when isAuth is set it means the password, username  was confirmed by the server
  if (isAuth){
    navigate('/');
  }

  return (
    <div  className='Moby Moby-Container-Page Moby-Container-Column Moby-Container-Center '>
      <MobyAlert signal={alert_signal} message={alert_message} type={alert_type} closeable={true}/>
      <div  className="Moby-Logo Moby-Logo-Medium">
        <img src={Logo} alt="Logo of Moby Software" />
      </div>

      {go === true ? (
        <h2 className='Moby-Heading'>Password</h2>
      ) : (
        <h2 className='Moby-Heading'>Username</h2>
      )}


      <div className='Moby-Icon-Block Moby-Credentials-Wrapper '>

        <CSSTransition in={go === false} timeout={{ enter: 200, exit: 0 }} classNames="Moby-Left" unmountOnExit appear>
          <input placeholder='Username' type='text' className='Moby-Credentials' onChange={(e) => {setUser(e.target.value);searchUser(e.target.value);}} spellCheck='false' onKeyPress={handleKeyPress} autoFocus={true} aria-label="Enter your username" />
        </CSSTransition>

        <CSSTransition in={go === true} timeout={{ enter: 200, exit: 0 }} classNames="Moby-Right" unmountOnExit appear>
          <input placeholder='Password' type='password' className='Moby-Credentials' onChange={(e) => handlePassword(e.target.value)} spellCheck='false' onKeyPress={handleKeyPress} autoFocus={true} aria-label="Enter your password"/>
        </CSSTransition>

        <svg xmlns="http://www.w3.org/2000/svg" id="arrow-circle-down" viewBox="0 0 24 24" width="512" height="512" className='Moby-Icon-Medium Moby-Icon-Dark Moby-Icon-Right' onClick={handleGo}>
          <path d="M0,12A12,12,0,1,0,12,0,12.013,12.013,0,0,0,0,12Zm16,0a2.993,2.993,0,0,1-.752,1.987c-.291.327-.574.637-.777.84L11.647,17.7a1,1,0,1,1-1.426-1.4L13.05,13.42c.187-.188.441-.468.7-.759a1,1,0,0,0,0-1.323c-.258-.29-.512-.57-.693-.752L10.221,7.7a1,1,0,1,1,1.426-1.4l2.829,2.879c.2.2.48.507.769.833A2.99,2.99,0,0,1,16,12Z" />
        </svg>
      </div>

      {go === true ? (
        <a className='Moby-Link' href='/forgot'>
          <h5 className='Moby-Heading'>Forgot Password?</h5>
          </a>
      ) : (
        <a className='Moby-Link' href='/help'>
          <h5 className='Moby-Heading'>Need Help?</h5>
          </a>
      )}

    </div>
  );
}

export default Auth;