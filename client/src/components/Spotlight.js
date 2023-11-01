import React, { useState, useEffect } from "react";
import "./../components/Spotlight.css";
import Cover from "./../assets/images/tangalle_2.jpg";
import Spotlight_Icon from "../assets/icons/blog.svg";

const Spotlight = () => {
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
							Explore New Worlds
						</div>

						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
							<circle cx="4" cy="4" r="4" fill="var(--brand-active)" />
						</svg>

						<div id="Slogan-2" className="Spotlight-Slogan">
							Enjoy Delicacies
						</div>

						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
							<circle cx="4" cy="4" r="4" fill="var(--brand-active)" />
						</svg>

						<div id="Slogan-3" className="Spotlight-Slogan">
							Share Endless Experiences
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Spotlight;
