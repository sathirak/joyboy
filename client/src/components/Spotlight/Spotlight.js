import React, { useEffect, useState } from "react";
import "./Spotlight.css";
import Element from "../Element/Element";

const data = ["123453-ev", "123456-ds", "123451-fd"];

function Spotlight() {
	const [currentIndex, setCurrentIndex] = useState(0);
	let intervalId;
  
	const handleClick = (index) => {
	  setCurrentIndex(index);
	  resetTimer();
	};
  
	const resetTimer = () => {
	  clearInterval(intervalId);
	  intervalId = setInterval(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
	  }, 15000);
	};
  
	useEffect(() => {
	  resetTimer();
	  return () => clearInterval(intervalId);
	}, [currentIndex]);

	return (
		<div className="Spotlight">

			{data.map((item, index) => (
				<div key={index} style={{ display: index === currentIndex ? "block" : "none" }}>
					<Element joydex={item} component="Spotlight" />
				</div>
			))}

			<div className="Spotlight-Button-Container">
				{data.map((item, index) => (
					<div className={`Spotlight-Button ${index === currentIndex ? "Active-Button" : ""}`} key={index} onClick={() => handleClick(index)}>
					</div>
				))}
			</div>
		</div>
	);
}

export default Spotlight;
