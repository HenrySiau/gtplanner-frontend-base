import React from 'react';
import InviteMemberForm from '../components/InviteMemberForm';
import '../css/InviteMemberSection.css';
const InviteMemberSection = (props) => (
    <div className="inviteMemberSectionContainer">
    <h1 className="title">Invite members to the trip group</h1>
    <div className="inviteMemberSection">
    <div className="infoSection">
        <img src="/images/login.png" className="image" alt="Invite Member"></img>
            </div>
            <InviteMemberForm className="inviteMemberForm" {...props}/>
    </div>
    </div>
        );
        
export default InviteMemberSection;

