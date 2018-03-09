import React from 'react';
import CreateTripForm from '../components/CreateTripForm';
import '../css/CreateTripSection.css';
const CreateTripSection = (props) => (
    <div className="createTripSection">
        <img src="/images/login.png" className="image" alt="login"></img>
            <CreateTripForm className="createTripForm" {...props} />
    </div>


);

export default CreateTripSection;