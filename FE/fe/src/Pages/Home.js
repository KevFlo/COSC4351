import BG from '../images/restaurant_bg.webp'
export default function Home() {
  return (
    // <h1> HOME</h1>
    <div className="Home">
      <div className="home-container">
            <div className="image-temp"><img src={BG} alt="restaurant" /></div>
        {/* <div className="footer">@COSC4351</div> */}
      </div>
    </div>
  );
}


