import React from 'react';
import LoginForm from '../components/LoginForm'
import '../css/loginSection.css';
const LoginSection = (props) => (
    <div className="loginSection">
        <img src="/images/login.png" className="image" ></img>
            <LoginForm className="loginForm" toggleLogin={props.toggleLogin} message="hello"/>
    </div>
        );
        
export default LoginSection;