import React, { useState, useEffect, Suspense } from "react";
import Settings from "./Moby_Settings";
import "./Moby.css";
import Logo from "./Moby.svg";

//These two arrays should be defined from a database, this is a temperory solution
const permitted_moby_modules = ["Breadboard", "Dashboard", "Analytics", "Template", "Registrar"];
const startup_moby_module = ["Registrar"];

const icons = {};

//This loop loads all the module icons permitted_moby_modules
permitted_moby_modules.forEach((moby_module) => {
  icons[moby_module] = require(`./moby-module-icons/${moby_module}.svg`);
});

function Moby() {

  //state for the currently active modules' component
  const [activeModule, setActiveModule] = useState(null);

  //state for the currently active module sidebar icon
  const [activeLink, setActiveLink] = useState(null);

  //handles the sidebar link click, checks if the module is allowed and then loads it
  const handle_module = (moby_module) => {
    
    if (permitted_moby_modules.includes(moby_module)) {
      const Component = React.lazy(() => import(`./moby-modules/${moby_module}`));
      setActiveModule(<Component />);
      setActiveLink(moby_module);
    } else {
      console.error(`Module "${moby_module}" is not permitted.`);
    }

  };

  //handles the settings click
  const toggle_settings = () => {
    setActiveModule(<Settings />);
    setActiveLink("Settings");
  };

  //empty useeffect to load the users favourite module on startup
  useEffect(() => {
    handle_module(startup_moby_module[0]);
  }, []);

  return (

    <div className="Moby">
      <div className="Moby-Sidebar">
        <div className="Moby-Sidebar-Logo-Border">
          <div className="Moby-Sidebar-Logo" onClick={toggle_settings} style={{outline: activeLink === "Settings" ? "3px dashed var(--moby-primary)" : 'transparent',}}>
            <img src={Logo} alt="Logo of Moby Software" />
          </div>
        </div>
        <div className="Moby-Sidebar-Inner">
          {permitted_moby_modules.map((moby_module) => (
            <div className={`Moby-Sidebar-Links ${activeLink === moby_module ? 'Moby-Selected' : ''}`} key={moby_module} onClick={() => handle_module(moby_module)} title={moby_module} >
              <img src={icons[moby_module]} className='Moby-Sidebar-Icon' alt={moby_module} />
            </div>
          ))}
        </div>
      </div>
      <div className="Moby-Content">
        <Suspense>
          {activeModule}
        </Suspense>
      </div>
    </div>
  );


}

export default Moby;
