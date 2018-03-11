import React from 'react';
import RegisterForm from '../components/RegisterForm'
import '../css/registerSection.css';
const RegisterSection = (props) => (
    <div className="registerSectionContainer">
        <h1 className="title">Create your GT Planner Account</h1>
        <div className="registerSection">
            <div className="infoSection">
                <img src="/images/register.jpg" className="image" alt="register"></img>
            </div>
            <RegisterForm className="registerForm" {...props}/>
        </div>
    </div>
);

export default RegisterSection;