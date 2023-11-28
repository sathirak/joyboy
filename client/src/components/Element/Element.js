import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./Element.css";

function Element({ joydex, component }) {

  const [data, setData] = useState([null]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/atlas/element-check/${joydex}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        setData(fetchedData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [joydex, component]);


  if (!data) {
    return <div>Loading...</div>;
  }

  let img;

  if (component === "Spotlight" && data && data.length > 0 && data[0]?.img_spotlight) {

    img = data[0]?.img_spotlight;

    return (
      <Link to={data[0]?.keikodex}>
        <div className="Element">
          <div className={component + '-Component'}>
            <div className={component + '-Component-Flag'}></div>
            <img className={component + '-Component-Img'} src={require(`../fakedata/img/img-1/${img}.jpg`)} alt={data[0]?.name + ' at ' + data[0]?.location} />
            <div className={component + '-Component-Title'} >{data[0]?.title_spotlight}</div>
          </div>
        </div>
      </Link>
    );
  }

  if (component === "Card" && data && data.length > 0 && data[0]?.img_spotlight) {

    img = data[0]?.img_card;

    return (
      <Link to={data[0]?.keikodex}>
        <div className="Card">
          <div className={component + '-Component'}>
            <div className={component + '-Component-Flag'}></div>
            <img className={component + '-Component-Img'} src={require(`../fakedata/img/img-1/${img}.jpg`)} alt="Default" />
            <div className={component + '-Component-Title'} >{data[0]?.title_spotlight}</div>
          </div>
        </div>
      </Link>
    );
  }

  return null;
}

export default Element;
