import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

const styles = {
    title: {
        cursor: 'pointer',
    },
    IconMenu: {
        margin: '0 20px 10px 0'
    }
};


class Login extends Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <div>
                <FlatButton {...this.props} label="Login" onClick={() => { alert('Login') }}/>
                <FlatButton {...this.props} label="Register" onClick={() => { alert('Register') }}/>
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
        <MenuItem primaryText="My Account"
            onClick={() => { alert('My Account') }} />
        <MenuItem primaryText="Help"
            onClick={() => { alert('Help') }} />
        <MenuItem primaryText="Sign out"
            onClick={() => { alert('Sign out') }} />
    </IconMenu>
);
Logged.muiName = 'IconMenu';


class GTPAppBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar
                className="appbar"
                title={<span style={styles.title}>Group Travel Planner</span>}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onTitleClick={()=>{alert('you clicked title')}}
                onLeftIconButtonClick={this.props.toggleDrawer}
                iconElementRight={this.props.logged ? <Logged /> : <Login />}
            />
        );
    }
}

export default GTPAppBar;