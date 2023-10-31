import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import Cuisine_Icon from "../assets/icons/cuisine.svg";
import "./../components/Cuisine.css";

import Pizza from './../assets/images/cuisine/pizza.jpg';
import Spaghetti from './../assets/images/cuisine/spaghetti.jpg';
import Butter_Chicken from './../assets/images/cuisine/butterchicken.jpg';
import Fried_Rice from './../assets/images/cuisine/friedrice.jpg';
import Seafood from './../assets/images/cuisine/seafood.jpg';

const CuisineCard = ({ link, imgSrc, altName, title }) => {

	return (
		<Link to={link} style={{ textDecoration: "none" }}>
			<article className="CuisineCard">
				<div className="CuisineCard-Container">
					<img src={imgSrc} alt={altName} className="CuisineCard-Image"/>
					<div className="CuisineCard-Title">{title}</div>
				</div>
			</article>
		</Link>
	);
};

const Cuisine = () => {

    const Panel_CuisineCard = [
        {
            key: "Pizza",
            link: "/Pizza",
            img: Pizza,
            title: "Pizza",
          },
          {
            key: "Spaghetti",
            link: "/Spaghetti",
            img: Spaghetti,
            title: "Spaghetti",
          },
          {
            key: "Butter_Chicken",
            link: "/Butter-Chicken",
            img: Butter_Chicken,
            title: "Butter Chicken",
          },
          {
            key: "Fried_Rice",
            link: "/Fried-Rice",
            img: Fried_Rice,
            title: "Fried Rice",
          },
          {
            key: "Seafood",
            link: "/Seafood",
            img: Seafood,
            title: "Seafood",
          },
	];

	return (
		<section className="Cuisine">

            <div className="Featured-Spacer"></div>
			<div className="Cuisine-Title">
				<div className="Cuisine-Title-Container">
					<div className="Cuisine-Title-Text">Enjoy a cuisine of delicacies</div>
					<img src={Cuisine_Icon} alt="Card Name" className="Cuisine-Icon" />
				</div>
				<div className="Cuisine-Title-Line"></div>
			</div>
			<div className="Cuisine-Container">
				<div className="Cuisine-Inner">
                {Panel_CuisineCard.map((card) => (
								<CuisineCard key={card.key} link={card.link} imgSrc={card.img} altName={card.key} title={card.title} />
							))}
				</div>

                <div className="Cuisine-More-Container">
                  <div className="Cuisine-More">Food &gt;&gt;</div>
                </div>

			</div>

		</section>
	);
};

export default Cuisine;
