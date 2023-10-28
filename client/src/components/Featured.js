import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import "./../components/Featured.css";
import Featured_Icon from "../assets/icons/Featured.svg";
import Arrow_Forward from "../assets/icons/arrow_forward.svg";
import Arrow_Backward from "../assets/icons/arrow_back.svg";

import Hotel_Img from "../assets/images/featured/hotels.jpg";
import Restaurant_Img from "../assets/images/featured/restaurants.jpg";
import Cafe_Img from "../assets/images/featured/cafes.jpg";
import Date_Night_Img from "../assets/images/featured/date-nights.jpg";
import Train_Rides_Img from "../assets/images/featured/train-rides.jpg";

import Beach_Resort_Img from "../assets/images/featured/beach-resorts.jpg";
import Wildlife_Safari_Img from "../assets/images/featured/wildlife-safaris.jpg";
import Cultural_Tour_Img from "../assets/images/featured/cultural-tour.jpg";
import Tea_Plantation_Img from "../assets/images/featured/tea-plantation.jpg";
import Adventure_Img from "../assets/images/featured/adventure-activities.jpg";

const FeatCard = ({ link, imgSrc, altName, title }) => {
	return (
		<Link to={link} style={{ textDecoration: "none" }}>
			<article className="FeatCard">
				<div className="FeatCard-Container">
					<img src={imgSrc} alt={altName} className="FeatCard-Image" />
					<div className="FeatCard-Title">{title}</div>
				</div>
			</article>
		</Link>
	);
};

const Featured = () => {
	const [PanelChange, setPanelChange] = useState(false);

	const First_Panel_FeatCard = [
		{
			key: "Hotel",
			link: "/Hotel",
			img: Hotel_Img,
			title: "Hotels",
		},
		{
			key: "Restaurant",
			link: "/Restaurants",
			img: Restaurant_Img,
			title: "Restaurants",
		},
		{
			key: "Cafe",
			link: "/Cafe",
			img: Cafe_Img,
			title: "Café",
		},
		{
			key: "Date-Night",
			link: "/Date-Night",
			img: Date_Night_Img,
			title: "Date Nights",
		},
		{
			key: "Train-Rides",
			link: "/Train-Rides",
			img: Train_Rides_Img,
			title: "Train Rides",
		},
	];

	const Second_Panel_FeatCard = [
		{
			key: "Beach-Resort",
			link: "/Beach-Resort",
			img: Beach_Resort_Img,
			title: "Beach Resorts",
		},
		{
			key: "Wildlife-Safari",
			link: "/Wildlife-Safari",
			img: Wildlife_Safari_Img,
			title: "Wildlife Safaris",
		},
		{
			key: "Cultural-Tour",
			link: "/Cultural-Tour",
			img: Cultural_Tour_Img,
			title: "Cultural Tours",
		},
		{
			key: "Tea-Plantation-Tour",
			link: "/Tea-Plantation-Tour",
			img: Tea_Plantation_Img,
			title: "Tea Tours",
		},
		{
			key: "Adventure-Activities",
			link: "/Adventure-Activities",
			img: Adventure_Img,
			title: "Activities",
		},
	];

	return (
		<section className="Featured">
			<div className="Featured-Spacer"></div>
			<div className="Featured-Title">
				<div className="Featured-Title-Container">
					Reserve a spot at your favorite place
					<img src={Featured_Icon} alt="Card Name" class="Featured-Icon" />
				</div>
				<div className="Featured-Title-Line"></div>
			</div>
			<div className="Featured-Container">
				{PanelChange ? (
					<img src={Arrow_Backward} alt="Backwards Arrow" className="Featured-Arrow" onClick={() => setPanelChange(false)} />
				) : (
					<img src={Arrow_Backward} className="Featured-Arrow" style={{ opacity: 0 }} />
				)}

				<div className="Featured-Inner">
					<div className="Featured-Panel" style={{transform: PanelChange ? "translateX(-100%)" : "translateX(0%)" }}>

						<div className="Featured-Panel-Sub">
							{First_Panel_FeatCard.map((card) => (
								<FeatCard key={card.key} link={card.link} imgSrc={card.img} altName={card.key} title={card.title} />
							))}
							<img src={Arrow_Forward} alt="Forwards Arrow" className="Featured-Arrow" onClick={() => setPanelChange(true)} />
						</div>
						<div className="Featured-Panel-Sub">
							{Second_Panel_FeatCard.map((card) => (
								<FeatCard key={card.key} link={card.link} imgSrc={card.img} altName={card.key} title={card.title} />
							))}
							<img src={Arrow_Backward} alt="Backwards Arrow" className="Featured-Arrow" onClick={() => setPanelChange(false)} />
						</div>

					</div>

				</div>

				{PanelChange ? (
					<img src={Arrow_Forward} className="Featured-Arrow" style={{ opacity: 0 }} />
				) : (
					<img src={Arrow_Forward} alt="Forwards Arrow" className="Featured-Arrow" onClick={() => setPanelChange(true)} />
				)}
			</div>
		</section>
	);
};

export default Featured;
