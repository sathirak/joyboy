import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./../components/Navigator.css";
import Logo from "../assets/icons/ramen.png";
import Search from "../assets/icons/search.svg";
import Account from "../assets/icons/account.png";

const Navigator = () => {
	
	const [isSearchActive, setSearchActive] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
	const searchInputRef = useRef(null);
	const searchWrapperRef = useRef(null);

	const activateSearch = () => {
		setSearchActive(true);

		if (!isSearchActive) {
			searchInputRef.current.focus();
		}
	};

	const handleClickOutside = (event) => {
		if (
			searchWrapperRef.current &&
			!searchWrapperRef.current.contains(event.target) &&
			searchInputRef.current &&
			!searchInputRef.current.contains(event.target)
		) {
			setSearchActive(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		const handleWindowResize = () => {
			setIsMobile(window.innerWidth < 800);
		};

		window.addEventListener("resize", handleWindowResize);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return (

		<section className="Navigator">
			<div className="Navigator-Bar">
				<div className="Navigator-Container">

					{isMobile && isSearchActive ? null : (
						<nav className="Navigator-Inner">
							<div className="Navigator-Logo-Wrapper">
								<div className="Navigator-Logo" style={{ backgroundImage: `url(${Logo})` }}></div>
							</div>
							<div className="Navigator-Title">Joyboy</div>
						</nav>
					)}

					<div className="Navigator-Middle">
						<nav className={`Navigator-Guide ${isSearchActive ? "Navigator-Guide-Hidden" : "Navigator-Guide"}`}>
							<Link to="/Food" className="Navigator-Link">
								Food
							</Link>
							<Link to="/Hotels" className="Navigator-Link">
								Hotels
							</Link>
							<Link to="/Places" className="Navigator-Link">
								Places
							</Link>
							<Link to="/Events" className="Navigator-Link">
								Events
							</Link>
						</nav>

						<input
							ref={searchInputRef}
							className={`Navigator-Search-Input ${isSearchActive ? "Navigator-Search-Input" : "Navigator-Search-Input-Hidden"}`}
							id="Search-Input"
							type="text"
							spellCheck="false"
							placeholder="I'm looking for..."
						/>
					</div>

					<nav className="Navigator-Inner">
						<div className="Navigator-Search-Wrapper" onClick={activateSearch} ref={searchWrapperRef}>
							<div className="Navigator-Search" style={{ backgroundImage: `url(${Search})` }}></div>
						</div>
					</nav>
				</div>

				{isMobile && isSearchActive ? null : (
					<div className="Navigator-Account-Wrapper">
						<div className="Navigator-Account-Container">
							<div className="Navigator-Account" style={{ backgroundImage: `url(${Account})` }}></div>
						</div>
					</div>
				)}
			</div>

			{isMobile && isSearchActive ? null : (
				<div className="Navigator-Ext">
					<div className="Navigator-Container-Ext">
						<nav className="Navigator-Guide">
							<a href="/Food" className="Navigator-Link-Ext">
								Food
							</a>
							<a href="/Hotels" className="Navigator-Link-Ext">
								Hotels
							</a>
							<a href="/Places" className="Navigator-Link-Ext">
								Places
							</a>
							<a href="/Events" className="Navigator-Link-Ext">
								Events
							</a>
						</nav>
					</div>
				</div>
			)}
      
		</section>
	);
};

export default Navigator;
