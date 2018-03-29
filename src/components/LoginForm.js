import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import settings from '../config';
import { connect } from 'react-redux';
import { loginWithPassword } from '../actions';

const styles = {
    loginButton: {
        margin: '10px 10px 5px 90px'
    }
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // toggleLogin = this.props.toggleLogin;

    handleEmailChange = (event) => {

        this.setState({
            email: event.target.value
        });
    };
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handleSubmit = () => {
        this.props.dispatch(loginWithPassword(this.state.email, this.state.password, this.props.inviteCode));
    }

    handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    // value={this.state.value}
                    onChange={this.handleEmailChange}
                /><br />
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    onChange={this.handlePasswordChange}
                    onKeyPress={this.handlePressEnter}
                /><br />
                <RaisedButton
                    label="Login"
                    primary={true}
                    onClick={this.handleSubmit}
                    style={styles.loginButton}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inviteCode: state.inviteCode
    }
}

LoginForm = connect(mapStateToProps)(LoginForm);
export default LoginForm