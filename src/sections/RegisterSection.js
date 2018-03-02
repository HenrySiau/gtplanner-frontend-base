import React from 'react';
import RegisterForm from '../components/RegisterForm'
import '../css/registerSection.css';
const RegisterSection = () => (
   <div className="registerSectionContainer">
    <h1 className="title">Create your GT Planner Accout</h1>
    <div className="registerSection">
        <img src="/images/register.jpg" className="image"></img>
            <RegisterForm className="registerForm"/>
    </div>
    </div>
        );
        
export default RegisterSection;