import React from 'react';
import LoginForm from '../components/LoginForm'
import '../css/loginSection.css';
const LoginSection = (props) => (
    <div className="loginSection">
        <img src="/images/login.png" className="image" alt="login"></img>
            <LoginForm className="loginForm" toggleLogin={props.toggleLogin}/>
    </div>
        );
        
export default LoginSection;