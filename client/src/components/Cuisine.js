import React from "react";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";

const CuisineCard = ({ link, imgSrc, altName, title }) => {
	return (
		<Link to={link} style={{ textDecoration: "none" }}>
			<article className="CuisineCard">
				<div className="CuisineCard-Container">
					<img src={imgSrc} alt={altName} className="CuisineCard-Image" />
					<div className="CuisineCard-Title">{title}</div>
				</div>
			</article>
		</Link>
	);
};

const Cuisine = () => {
	return (
		<section className="Cuisine">
			<div className="Cuisine-Title">
				<div className="Cuisine-Title-Line"></div>
				<div className="Cuisine-Title-Container">
					<div className="Cuisine-Title-Text">Cuisine</div>
					<img src={Featured_Icon} alt="Card Name" className="Cuisine-Icon" />
				</div>
				<div className="Cuisine-Title-Line"></div>
			</div>
			<div className="Cuisine-Container">
				<div className="Cuisine-Inner">
					<CuisineCard />
				</div>
			</div>
		</section>
	);
};
export default Cuisine;
