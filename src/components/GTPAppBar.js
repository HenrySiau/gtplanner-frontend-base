import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { NavLink } from 'react-router-dom';
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
        color: 'white',
        margin: '6px 0 0 0'
    },
    appBar: {
        height: 70
    },
    badge: {
        margin: '0 10px 0 0',
        padding: 0,
        height: 10
    },
    MenuItem: {
        link: 'text-decoration: none',
        color: 'black'
    }
};


class Login extends Component {
    render() {
        return (
            <div>
                <NavLink to="/login" ><FlatButton label="Login" style={styles.link} /></NavLink>
                <NavLink to="/register"><FlatButton label="Register" style={styles.link} /></NavLink>
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
            <MenuItem> <NavLink to="/myaccount" style={styles.MenuItem}> My Account </NavLink></MenuItem>
            <MenuItem> <NavLink to="/help" style={styles.MenuItem}> Help </NavLink></MenuItem>
            <MenuItem primaryText="Sign out"
                onClick={() => {
                    props.toggleLogout();
                    window.location = "/"; // redirect to home page and reload
                }} />
        </IconMenu>

        <IconMenu
            iconButtonElement={<IconButton tooltip="More Actions" touch={true}>
                <Subject hoverColor={greenA200} color={grey800} />
            </IconButton>}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
        >
            <MenuItem> <NavLink to="/event/new" style={styles.MenuItem}> New Event </NavLink></MenuItem>
            <MenuItem> <NavLink to="/members/invite" style={styles.MenuItem}> Invite </NavLink></MenuItem>
            <MenuItem> <NavLink to="/trip/new" style={styles.MenuItem}> Create a new trip</NavLink></MenuItem>
            <MenuItem> <NavLink to="/settings" style={styles.MenuItem}> Settings </NavLink></MenuItem>
        </IconMenu>
    </div>
);

const TitleWithTripName = (props) => (
    <span style={styles.title}><NavLink to="/" style={styles.link}>{props.tripName}</NavLink></span>
);

const TitleWithoutTripName = (props) => (
    <span style={styles.title}><NavLink to="/" style={styles.link}>Grout Travel Planner</NavLink></span>
);

class GTPAppBar extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // do not need to check if user already login because this function will
        // invoke immediately each time user use our app
        // if user has an id_token
        if (localStorage.getItem('id_token')) {
            // wil login if id_token is valid
            this.props.validateJWT(localStorage.getItem('id_token'));
            this.props.updateSelectedTrip(null); //fetch default trip info
        }
    }
    render() {
        return (
            <div>
                <AppBar
                    className="appbar"
                    title={this.props.selectedTrip.tripName ? <TitleWithTripName tripName={this.props.selectedTrip.tripName} /> : <TitleWithoutTripName />}
                    onLeftIconButtonClick={this.props.toggleDrawer}
                    iconElementRight={this.props.isLoggedIn ? <Logged toggleLogout={this.props.logout} /> : <Login />}
                    style={styles.appBar}
                />
            </div>
        );
    }
}

export default GTPAppBar;