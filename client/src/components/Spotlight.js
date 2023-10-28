import React, { useState, useEffect } from "react";
import "./../components/Spotlight.css";
import Cover from "./../assets/images/tangalle_2.jpg";
import Spotlight_Icon from "../assets/icons/blog.svg";

const slogans1 = ["Explore New Worlds", "Discover Treasures", "Embark on Adventures"];
const slogans2 = ["Enjoy Delicacies", "Savor Local Cuisine", "Taste the World"];
const slogans3 = ["Share Endless Experiences", "Create Lasting Memories", "Connect with Cultures"];

const Spotlight = () => {

	const [currentSloganIndex1, setCurrentSloganIndex1] = useState(0);
	const [currentSloganIndex2, setCurrentSloganIndex2] = useState(0);
	const [currentSloganIndex3, setCurrentSloganIndex3] = useState(0);

	const updateSlogan = (sloganIndex, setSloganIndex, slogans) => {
		setSloganIndex((sloganIndex + 1) % slogans.length);
	};

	useEffect(() => {
		const sloganRotationInterval = setInterval(() => {

			updateSlogan(currentSloganIndex1, setCurrentSloganIndex1, slogans1);
			updateSlogan(currentSloganIndex2, setCurrentSloganIndex2, slogans2);
			updateSlogan(currentSloganIndex3, setCurrentSloganIndex3, slogans3);

		}, 3500);

		return () => {
			clearInterval(sloganRotationInterval);
		};

	}, [currentSloganIndex1, currentSloganIndex2, currentSloganIndex3]);

	return (
		
		<section className="Spotlight">
			<div className="Spotlight-Spacer"></div>
			<div className="Spotlight-Container">
				<div className="Spotlight-Cover">
					<img src={Cover} alt="Tangalle Beach, Hambantota" className="Spotlight-Image" />
					<div className="Spotlight-Inner">
						<div className="Spotlight-Icon" style={{ backgroundImage: `url(${Spotlight_Icon})` }}></div>
						<div className="Spotlight-Text">
							Tangalle Beach, Hambantota
							<div className="Spotlight-Underline"></div>
						</div>
					</div>
					<div className="Spotlight-Under">
            
						<div id="Slogan-1" className="Spotlight-Slogan">
							{slogans1[currentSloganIndex1]}
						</div>

						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
							<circle cx="4" cy="4" r="4" fill="var(--brand-active)" />
						</svg>

						<div id="Slogan-2" className="Spotlight-Slogan">
							{slogans2[currentSloganIndex2]}
						</div>

						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
							<circle cx="4" cy="4" r="4" fill="var(--brand-active)" />
						</svg>

						<div id="Slogan-3" className="Spotlight-Slogan">
							{slogans3[currentSloganIndex3]}
						</div>

					</div>
				</div>
			</div>
		</section>
	);
};

export default Spotlight;
