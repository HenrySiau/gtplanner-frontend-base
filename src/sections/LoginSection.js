import React from 'react';
import LoginForm from '../components/LoginForm'
import '../css/loginSection.css';
const LoginSection = () => (
    <div className="loginSection">
        <img src="/images/login.png" className="image"></img>
            <LoginForm className="loginForm"/>
    </div>
        );
        
export default LoginSection;