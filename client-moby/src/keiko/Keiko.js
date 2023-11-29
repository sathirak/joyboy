import React, { useState} from 'react';
import {SidebarButton} from './keiko-icons/';
import './Keiko.css';

function Keiko() {
    const [sidebar,setSideBar] = useState(null);

    return (
        <div className='Keiko'>
          <div className='Keiko-Sidebar-Button'>

          </div>

          <div className='Keiko-Sidebar'>

          </div>

          <div className='Keiko-Content'>

          </div>
        </div>
      );

}

export default Keiko;