import React from 'react';
import InviteMemberForm from '../components/InviteMemberForm';
import '../css/InviteMemberSection.css';
const InviteMemberSection = (props) => (
    <div className="inviteMemberSection">
        <img src="/images/login.png" className="image" alt="Invite Member"></img>
            {/* <LoginForm className="loginForm" toggleLogin={props.toggleLogin}/> */}
            <InviteMemberForm className="inviteMemberForm" {...props}/>
    </div>
        );
        
export default InviteMemberSection;