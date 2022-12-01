import React, { useState } from 'react';
import { Link } from "react-router-dom";


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

    const onSubmit = async (e) => {
        e.preventDefault();
        /*const newReservation = {
            partySize,
            date,
            time,
            name,
            email,
            phoneNumber,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify(newReservation);

            // const res = await axios.post('/api/users', body, config);
            // console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }*/
        // For testing
        console.log("Submit");
        await fetch(`/reservation/${partySize}/${date}/${time}/${phoneNumber}/sampleName/sampleEmail`, {
            method: "GET"
        })
            .then(res => res.text())
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
                    <input
                        type="submit"
                        className="Reservation-Form-Form-Button"
                        value="Reserve"
                    />
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