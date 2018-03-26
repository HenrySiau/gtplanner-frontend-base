import React from 'react';
import InviteCodeForm from '../components/InviteCodeForm';
import '../css/WelcomeSection.css';
const WelcomeSection = (props) => (
    <div className="WelcomeSection">
        <img src="/images/login.png" className="image" alt="login"></img>
            {/* <LoginForm className="loginForm" toggleLogin={props.toggleLogin}/> */}
            <InviteCodeForm className="InviteCodeForm" />
    </div>
        );
        
export default WelcomeSection;