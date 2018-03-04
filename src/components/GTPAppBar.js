import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';

const styles = {
    title: {
        cursor: 'pointer',
    },
    IconMenu: {
        margin: '0 20px 10px 0'
    },
    link: {
        link: 'text-decoration: none',
        color: 'white'
    }
};


class Login extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Link to="/login" ><FlatButton {...this.props} label="Login" style={styles.link} /></Link>
                <Link to="/register"><FlatButton {...this.props} label="Register" style={styles.link} /></Link>
            </div>
        );
    }
}

const Logged = (props) => (

    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><Avatar
                src="images/user.png"
                size={40}
            /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        style={styles.IconMenu}
    >
        <Link to="/myaccount"> <MenuItem primaryText="My Account" /></Link>
        <Link to="/help"><MenuItem primaryText="Help" /></Link>
        <MenuItem primaryText="Sign out"
            onClick={() => {
                localStorage.removeItem('id_token');
                props.toggleLogout();
            }} />
    </IconMenu>
);


class GTPAppBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar
                className="appbar"
                title={<span style={styles.title}><Link to="/" style={styles.link}>Group Travel Planner</Link></span>}
                onLeftIconButtonClick={this.props.toggleDrawer}
                iconElementRight={this.props.isLogged ? <Logged toggleLogout={this.props.toggleLogout}/> : <Login />}

            />
        );
    }
}

export default GTPAppBar;