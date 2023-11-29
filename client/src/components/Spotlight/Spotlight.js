import React, { useEffect, useState } from "react";
import "./Spotlight.css";
import Element from "../Element/Element";

const data = ['202306-FOOD-1', '202306-FOOD-2', '202306-FOOD-3'];

function Spotlight() {
	
	const [currentIndex, setCurrentIndex] = useState(0);
	const [intervalId, setIntervalId] = useState(null);

	const handleClick = (index) => {
		setCurrentIndex(index);
		clearInterval(intervalId);
		const newIntervalId = setInterval(() => {
		  setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
		}, 15000);
		setIntervalId(newIntervalId);
	  };
	
	  useEffect(() => {
		const newIntervalId = setInterval(() => {
		  setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
		}, 15000);
		setIntervalId(newIntervalId);
	
		return () => clearInterval(newIntervalId);
	  }, []);

	return (
		<div className="Spotlight">
			{data.map((item, index) => (
				<div key={index} style={{ display: index === currentIndex ? "block" : "none" }}>
					<Element joydex={item} component="Spotlight" />
				</div>
			))}
			<div className="Spotlight-Button-Container">
				{data.map((item, index) => (
					<div
						className={`Spotlight-Button ${index === currentIndex ? "Active-Button" : ""}`}
						key={index}
						onClick={() => handleClick(index)}
					/>
				))}
			</div>
		</div>
	);
}

export default Spotlight;
