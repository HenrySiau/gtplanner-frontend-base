import React from 'react';
import CreateTripForm from '../components/CreateTripForm';
import '../css/CreateTripSection.css';
const CreateTripSection = (props) => (
    <div className="createTripSectionContainer">
        <h1 className="title">Start a new trip</h1>
        <div className="createTripSection">
            <div className="infoSection">
                <img src="/images/login.png" className="image" alt="login"></img>
            </div>
            <CreateTripForm className="createTripForm" {...props} />
        </div>
    </div>


);

export default CreateTripSection;