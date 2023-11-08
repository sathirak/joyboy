import React, { useState, Suspense } from "react";
import "./Core.css";

const componentFileNames = ["Analytics", "Breadboard", "Dashboard"];

function Core() {

  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleComponentClick = (componentFileName) => {

    const Component = React.lazy(() => import(`./core-components/${componentFileName}`));
    setSelectedComponent(<Component />);

  };

  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
      setDarkTheme(!darkTheme);
  };

  return (

    <div className={`Core ${darkTheme ? 'dark' : 'light'}`}>
      <div className="Sidebar">
        <h1>Core</h1>
        <div className="Sidebar-Inner">
        {componentFileNames.map((componentFileName) => (
          <div className="Sidebar-Links" key={componentFileName} onClick={() => handleComponentClick(componentFileName)}>
            {componentFileName}
          </div>
        ))}
        </div>
      </div>
      <div className="Content">
        <div onClick={toggleTheme}>Theme</div>
        <Suspense fallback={<div>Loading...</div>}>
          {selectedComponent}
        </Suspense>
      </div>
    </div>
  );

}

export default Core;
