import React, { useState } from 'react';
import {useAuth} from '../AuthProvider';
import MobyAlert from './moby-components/Moby_Alert';

function Settings() {

  const [alert_signal, set_alert_signal] = useState(false);
  const [alert_message, set_alert_message] = useState(false);
  const [alert_type, set_alert_type] = useState(false);

  const {fetchAuth} = useAuth();
    
  const logout = () => {

    set_alert_signal(false);

    fetch('/hyperion/logout', {
      method: 'GET',
      credentials: 'include',
    })

      .then((response) => response.text())
      .then((data) => {

        fetchAuth();

        set_alert_message(data);
        set_alert_type('Warn');
        set_alert_signal(true);

      })
      .catch((error) => {
        console.error('Error fetching status:', error);
      });
  }
    return (
      <div>
        <MobyAlert signal={alert_signal} message={alert_message} type={alert_type} closeable={true}/>
        <h1>Moby Settings</h1>
        <div className='Moby-Button' onClick={logout} >Logout</div>
      </div>
    );
}

export default Settings;