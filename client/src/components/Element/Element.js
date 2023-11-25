import React from "react";
import { Link } from "react-router-dom";
import "./Element.css";

function Element({ joydex, component }) {
  if (component === "Spotlight") {
    const img = require(`../fakedata/img/img-1/${joydex}-img-1.jpg`);

    return (
      <Link to="/your-route">
        <div className="Element">
          <div className={component + '-Component'}>
            <div className={component + '-Component-Flag'}></div>
            <img className={component + '-Component-Img'} src={img} alt="Default Image" />
            <div className={component + '-Component-Title'} >Colombo, Sri Lanka</div>
          </div>
        </div>
      </Link>
    );
  }

  return null;
}

export default Element;
