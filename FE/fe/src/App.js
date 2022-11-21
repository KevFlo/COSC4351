import Navbar from './component/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Reservation from './Pages/Reservations';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import './App.css';



function App() {

  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='Login' element={<Login />} />
          <Route path='Register' element={<Register />} />
          <Route path='Reservation' element={<Reservation />} />
        </Routes>
      </div>
      
    </>
    
    
  );
}

export default App;


