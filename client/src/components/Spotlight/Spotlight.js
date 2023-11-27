import React, { useEffect, useState } from "react";
import "./Spotlight.css";
import Element from "../Element/Element";

const data = ['202306-FOOD-1', '202306-FOOD-2', '202306-FOOD-3'];

function Spotlight() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleClick = (index) => {
	  setCurrentIndex(index);
	};

	useEffect(() => {
	  let intervalId = setInterval(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
	  }, 15000);

	  return () => clearInterval(intervalId);
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
