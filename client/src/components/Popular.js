import "./../components/Popular.css";
import Card from "./../components/Card";

const Popular = () => {
	return (
		<section className="Popular">
			<div className="Popular-Spacer"></div>
			<div className="Popular-Container">
				<div className="Popular-Inner">
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
