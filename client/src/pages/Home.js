import "./../App.css";
import "./../Joyboy-UI.css";
import "./../Joyboy-Layout.css";
import "./../Joyboy-Ani.css";
import Navigator from "./../components/Navigator";
import Spotlight from "./../components/Spotlight";
import Popular from "./../components/Popular";
import Featured from "./../components/Featured";

function Home() {
  return (
    <div className="Home">
        <Navigator />
        <Spotlight />
        <Popular />
        <Featured />
    </div>
  );
}

export default Home;