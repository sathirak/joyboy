import "./../components/Popular.css";
import Card from "./../components/Card";

const Popular = () => {
	return (
		<section className="Popular">
			
			<div className="Popular-Container">
			<div className="Popular-Spacer"></div>
				<div className="Popular-Over">
					<div id="Slogan-1" className="Popular-Slogan">
						Explore New Worlds
					</div>

					<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
						<circle cx="4" cy="4" r="4" fill="var(--brand-active)" />
					</svg>

					<div id="Slogan-2" className="Popular-Slogan">
						Enjoy Delicacies
					</div>

					<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
						<circle cx="4" cy="4" r="4" fill="var(--brand-active)" />
					</svg>

					<div id="Slogan-3" className="Popular-Slogan">
						Experience Culture
					</div>
				</div>
				<div className="Popular-Inner">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		</section>
	);
};
export default Popular;
