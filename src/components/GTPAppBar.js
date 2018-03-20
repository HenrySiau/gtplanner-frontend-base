import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import settings from '../config';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Add from 'material-ui/svg-icons/content/add';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import Subject from 'material-ui/svg-icons/action/subject';
import { greenA200, grey800 } from 'material-ui/styles/colors';

const styles = {
    title: {
        cursor: 'pointer',
    },
    IconMenu: {
        // margin: '0 20px 10px 0'
    },
    IconMenus: {
        margin: '0',
        height: '20'
    },
    link: {
        link: 'text-decoration: none',
        color: 'white'
    },
    appBar: {
        height: 70
    },
    badge: {
        margin: '0 10px 0 0',
        padding: 0,
        height: 10
    }
};


class Login extends Component {
    render() {
        return (
            <div>
                <Link to="/login" ><FlatButton label="Login" style={styles.link} /></Link>
                <Link to="/register"><FlatButton label="Register" style={styles.link} /></Link>
            </div>
        );
    }
}

const Logged = (props) => (
    <div style={styles.IconMenus}>
        {/* TODO: link to Notifications page */}
        {/* TODO: do not show badge if message count is 0 */}
        <Badge
            badgeContent={18}
            secondary={true}
            badgeStyle={{ top: -5, right: -5 }}
            style={styles.badge}
        >
            <IconButton tooltip="Message">
                <NotificationsIcon hoverColor={greenA200} color={grey800} />
            </IconButton>
        </Badge>

        <IconMenu
            iconButtonElement={
                <IconButton tooltip="My Account"><Avatar
                    src={settings.imageServerUrl + "/images/user.png"}
                    // src= "/images/user.png"
                    size={30}
                /></IconButton>

            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
            style={styles.IconMenu}
        >
            <Link to="/myaccount"> <MenuItem primaryText="My Account" /></Link>
            <Link to="/help"><MenuItem primaryText="Help" /></Link>
            <MenuItem primaryText="Sign out"
                onClick={() => {
                    props.toggleLogout();
                    window.location = "/"; // redirect to home page and reload
                }} />
        </IconMenu>

        <IconMenu
            iconButtonElement={<IconButton tooltip="More Actions">
                <Subject hoverColor={greenA200} color={grey800} />
            </IconButton>}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}

        >
            <MenuItem primaryText="New Event" />
            <MenuItem primaryText="Invites" />
            <MenuItem primaryText="Create a new trip" />
            <MenuItem primaryText="Settings" />
        </IconMenu>
    </div>
);


class GTPAppBar extends Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem('id_token')){
            this.props.validateJWT(localStorage.getItem('id_token'));
        }

    }
    render() {
        return (
            <div>
                <AppBar
                    className="appbar"
                    title={<span style={styles.title}><Link to="/" style={styles.link}>Group Travel Planner</Link></span>}
                    onLeftIconButtonClick={this.props.toggleDrawer}
                    iconElementRight={this.props.isLoggedIn ? <Logged toggleLogout={this.props.logout} /> : <Login />}
                    style={styles.appBar}
                />
            </div>
        );
    }
}

export default GTPAppBar;