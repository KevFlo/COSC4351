import Navbar from './component/Navbar';
import './App.css';

function butClick(){
  alert('You clicked a button!')
}

function App() {
  return (
    <div className="App">
        <div className="header">
          <div className="logo">KYBALION</div>
          <Navbar />
        </div>
        <div className="content">
          <div className="sample-text">SAMPLE TEXT</div>
        </div>
        <div className="image-cards">
            <div className="image-temp"></div>
            <div className="image-temp"></div>
            <div className="image-temp"></div>
          </div>
        <div className="footer">@COSC4351</div>
    </div>
  );
}

export default App;