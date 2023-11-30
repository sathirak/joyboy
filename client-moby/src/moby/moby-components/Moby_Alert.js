import React from "react";
import { useState } from "react";

const Moby_Alert = ({ signal, message, type, closeable, close_funct, link }) => {
	const [showPopup, setShowPopup] = useState(true);

	const closePopup = () => {
		close_funct();
	};

	return (
		<>
        {signal && (<>
			{showPopup && (
				<a className="Moby-Alert" href={link} >
					<div className={'Moby-Container-Alert Moby-' + type }>
						{message}
						{closeable && (
							<svg onClick={closePopup} style={{ marginLeft: '20px', width: '25px', height: '25px' }} fill="#f5f5f5" className="Moby-Icon-Small"
								version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" width="512" height="512" >
								<path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256C511.847,114.678,397.322,0.153,256,0z M341.333,311.189c8.669,7.979,9.229,21.475,1.25,30.144c-7.979,8.669-21.475,9.229-30.144,1.25c-0.434-0.399-0.85-0.816-1.25-1.25L256,286.165l-55.168,55.168c-8.475,8.185-21.98,7.95-30.165-0.525c-7.984-8.267-7.984-21.373,0-29.64L225.835,256l-55.168-55.168c-8.185-8.475-7.95-21.98,0.525-30.165c-8.267-7.984-21.373-7.984,29.64,0L256,225.835l55.189-55.168c7.979-8.669,21.475-9.229,30.144-1.25c8.669,7.979,9.229,21.475,1.25,30.144c-0.399,0.434-0.816,0.85-1.25,1.25L286.165,256L341.333,311.189z" />
							</svg>
						)}
					</div>
				</a>
			)}</>

            )}
		</>
	);
};

export default  Moby_Alert;