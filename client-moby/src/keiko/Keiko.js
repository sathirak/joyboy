import React, { useState} from 'react';
import './Keiko.css';

import sidebarButton from './keiko-icons/sidebar_button.svg';

function Keiko() {
    const [sidebar,setSideBar] = useState(false);

    return (
        <div className='Keiko'>
          <div className='Keiko-Sidebar-Button-Wrapper'>
            <img src={sidebarButton} alt='Sidebar Button' className='Keiko-Sidebar-Button' onClick={() => setSideBar(!sidebar)}/>
          </div>

            {sidebar && (
              <div className='Keiko-Sidebar'>
              </div>
            )}

          <div className='Keiko-Content'>
            <h4 className='Keiko-Heading'>Keiko Dashboard</h4>
          </div>
        </div>
      );

}

export default Keiko;