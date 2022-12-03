import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup'; 

import 'reactjs-popup/dist/index.css'; 
import 'reactjs-popup/dist/index.css';
import TablePick from '../component/TablePicker';



const Reservation = () => {
    const [formData, setFormData] = useState({
        partySize: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phoneNumber: '',
    });

    const { partySize, date, time, name, email, phoneNumber } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]); 

    const onSubmit = async (e) => {
        e.preventDefault();

        await fetch(`/reservation/${partySize}/${date}/${time}/${phoneNumber}/sampleName/sampleEmail`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => {
                if (res.error != null) { console.log('Error');}
                else{
                    // var json = JSON.parse(res);
                    var resSeating = zip(res.tables, res.seats);
                    var highTraffic = res.high_traffic;

                    console.log(resSeating);

                    if (highTraffic === true) {
                        alert ("There will be a $10 non-refundable fee for no shows on high traffic days");
                    }
                }
            })
            .then(res => console.log(res))
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);

            
        
    };



    return (
    //   <h1> Reservation</h1>
        <div className="Reservation-Form">
            <div className="Reservation-Form-Content">
                <div className="Reservation-Form-Title">Reservation</div>
                <form className="Reservation-Form-Form" onSubmit={(e) => onSubmit(e)}>
                    <div className="Reservation-Form-Form-Group">
                        <label className="Reservation-Form-Form-Label">Party Size</label>
                        <input
                            className="Reservation-Form-Form-Input"
                            type="number"
                            placeholder="Party Size"
                            name="partySize"
                            value={partySize}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="Reservation-Form-Form-Group">
                        <label className="Reservation-Form-Form-Label">Date</label>
                        <input

                            className="Reservation-Form-Form-Input"
                            type="date"
                            placeholder="Date"
                            name="date"
                            value={date}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="Reservation-Form-Form-Group">
                        <label className="Reservation-Form-Form-Label">Time</label>
                        <input
                            className="Reservation-Form-Form-Input"
                            type="time"
                            placeholder="Time"
                            name="time"
                            value={time}
                            onChange={(e) => onChange(e)}
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="Reservation-Form-Form-Group">
                        <label className="Reservation-Form-Form-Label">
                            Phone Number
                        </label>
                        <input
                            className="Reservation-Form-Form-Input"
                            type="tel"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => onChange(e)}
                            required
                            minLength="6"
                        />
                    </div>
                    <Popup className="Reservation-Form-Form-Button" trigger={<button> Submit </button>}  

                        position="right center"> 
                
                        <div>SeatPicker</div> 
                        <TablePick/>
                
                        <button>Click here</button> 
                
                        </Popup> 
                </form>

                <p className="Reservation-Form-Text">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
                <p className="Reservation-Form-Text">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
        

  );
};

export default Reservation;