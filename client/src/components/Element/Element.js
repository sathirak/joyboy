import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./Element.css";

function Element({ joydex, component }) {

  const [data, setData] = useState([null]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Requested Keiko');
      try {
        const response = await fetch(`/keiko/output/${joydex}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        console.log(fetchedData);
        console.log(fetchedData[0].title_spotlight);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [joydex]);

  if (!data) {
    return <div>Loading...</div>;
  }

  if (component === "Spotlight") {

    const img = require(`../fakedata/img/img-1/202306-FOOD-1-spotlight.jpg`);
    return (
      <Link to="/your-route">
        <div className="Element">
          <div className={component + '-Component'}>
            <div className={component + '-Component-Flag'}></div>
            <img className={component + '-Component-Img'} src={img} alt="Default" />
            <div className={component + '-Component-Title'} >{data[0]?.title_spotlight}</div>
          </div>
        </div>
      </Link>
    );
  }

  if (component === "Card") {

    const img = require(`../fakedata/img/img-1/202306-FOOD-1-spotlight.jpg`);

    return (
      <Link to="/your-route">
        <div className="Element">
          <div className={component + '-Component'}>
            <div className={component + '-Component-Flag'}></div>
            <img className={component + '-Component-Img'} src={img} alt="Default" />
            <div className={component + '-Component-Title'} >{data[0]?.title_spotlight}</div>
          </div>
        </div>
      </Link>
    );
  }

  return null;
}

export default Element;
