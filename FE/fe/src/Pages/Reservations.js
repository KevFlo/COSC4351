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

    const [data, setData] = useState('');

    
    const { partySize, date, time, name, email, phoneNumber } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]); 
    
    const cleanData = (data) => {
        let resSeating = data
        let cleanSeating = [];
        let smallTble = [];
        // let tables = data.tables;
        // let seats = data.seats;
        for (let i = 0; i < resSeating.length; i++) {
            // resSeating[i] = resSeating[i].split(',');
            if (resSeating[i][1] === partySize) {
                cleanSeating.push(resSeating[i]);
            }else if (resSeating[i][1] < partySize) {
                smallTble.push(resSeating[i]);
            }
        }
        // for each small table if smaller tables can comgine to fit the party size comebine them and create a new table

        // for each small table if smaller tables can comgine to fit the party size comebine them and create a new table
        for (let i = 0; i < smallTble.length; i++) {
            for (let j = i+1 ; j < smallTble.length; j++) {
                let temp = smallTble[i][1] + smallTble[j][1];
                if (temp >= partySize) {
                    cleanSeating.push([smallTble[i][0] + ',' + smallTble[j][0], smallTble[i][1] + smallTble[j][1]]);
                }
            }
        }
        return cleanSeating;
    }

// // for each small table if smaller tables can comgine to fit the party size comebine them and create a new table
// for (let i = 0; i < smallTble.length; i++) {
//     let temp = smallTble[i];
//     for (let j = i + 1; j < smallTble.length; j++) {
//         if (temp[1] + smallTble[j][1] <= partySize) {
//             temp = [temp[0], temp[1] + smallTble[j][1]];
//             smallTble.splice(j, 1);
//         }
//     }
//     cleanSeating.push(temp);
// }


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
                    var cleanSeating = cleanData(resSeating);
                    console.log(cleanSeating);
                    var highTraffic = res.high_traffic;
                    const parentToChild = () => {
                        setData(cleanSeating);
                    }
                    parentToChild();


                    if (highTraffic === true) {
                        alert ("There will be a $10 non-refundable fee for no shows on high traffic days");
                    }
                }
            })
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
                        <TablePick parentToChild={data}/>
                
                        <button>Confirm Tables</button> 
                
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