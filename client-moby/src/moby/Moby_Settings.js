import React from 'react';
import {useAuth} from '../AuthProvider';

function Settings() {

  const {fetchAuth} = useAuth();
    
  const logout = () => {
    fetch('/hyperion/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.text())
      .then((data) => {
        fetchAuth();
      })
      .catch((error) => {
        console.error('Error fetching status:', error);
      });
  }
    return (
      <div>
        <h1>Moby Settings</h1>
        <div className='Moby-Button' onClick={logout} >Logout</div>
      </div>
    );
}

export default Settings;