import "./../App.css";
import "./../Joyboy-UI.css";
import "./../Joyboy-Layout.css";
import "./../Joyboy-Ani.css";
import Navigator from "./../components/Navigator";
import Popular from "./../components/Popular";
import Featured from "./../components/Featured";
import Cuisine from "./../components/Cuisine";
import Explore from "./../components/Explore";

function Home() {
  return (
    <div className="Home">
        <Navigator />
        <Popular />
        <Featured />
        <Cuisine />
        <Explore />
    </div>
  );
}

export default Home;