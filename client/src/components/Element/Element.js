import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./Element.css";

function Element({ joydex, component }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchKeikoData = async () => {
      try {
        const response = await fetch(`/output/${joydex}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        console.log(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchKeikoData();
  }, [joydex]);

  if (component === "Spotlight") {
    const img = require(`../fakedata/img/img-1/${joydex}-img-1.jpg`);

    return (
      <Link to="/your-route">
        <div className="Element">
        {data.map((item) => (
        <div key={item.serial_number}>
          <p>Name: {item.name}</p>
          <p>Location: {item.location}</p>
        </div>
      ))}
          <div className={component + '-Component'}>
            <div className={component + '-Component-Flag'}></div>
            <img className={component + '-Component-Img'} src={img} alt="Default" />
            <div className={component + '-Component-Title'} >Colombo, Sri Lanka</div>
          </div>
        </div>
      </Link>
    );
  }

  return null;
}

export default Element;
