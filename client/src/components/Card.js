import "./../components/Card.css";
import Card_Face from "../assets/images/ella_nine_arch.jpeg";
import Location from "../assets/icons/location.svg";

const Card = () => {
	return (
        
		<article className="Card">
			<div className="Card-Container">
				<img src={Card_Face} alt="Card Name" class="Card-Image" />
                <div className="Card-Title">
                    Placeholder Name
                    <div className="Card-Location">
                    <img className="Card-Icon" src={Location}/>
                    Placeholder, Location
                    </div>
                </div>
			</div>
		</article>
	);
};
export default Card;
