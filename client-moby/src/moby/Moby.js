import React, { useState, useEffect, Suspense } from "react";
import Settings from "./Moby_Settings";
import "./Moby.css";

import Logo from "./Moby.svg";

const permitted_moby_modules = ["Breadboard", "Dashboard", "Analytics", "Template", "Registrar"];
const startup_moby_module = ["Template"];
const icons = {};

permitted_moby_modules.forEach((moby_module) => {
  icons[moby_module] = require(`./moby-module-icons/${moby_module}.svg`);
});

function Moby() {

  const [activeModule, setActiveModule] = useState(null);
  const [activeLink, setActiveLink] = useState(null);

  const handle_module = (moby_module) => {
    

    if (permitted_moby_modules.includes(moby_module)) {
      const Component = React.lazy(() => import(`./moby-modules/${moby_module}`));
      setActiveModule(<Component />);
      setActiveLink(moby_module);
    } else {
      console.error(`Module "${moby_module}" is not permitted.`);
    }

  };

  const toggle_settings = () => {
    setActiveModule(<Settings />);
    setActiveLink("Settings");
  };

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
