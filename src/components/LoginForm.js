import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import settings from '../config';
import { connect } from 'react-redux';
import { loginWithToken, loginWithPassword } from '../actions';
import { withRouter } from 'react-router-dom';

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
        // this.props.dispatch(loginWithPassword('a@aa.com','a', this.props.history));
        // let { dispatch } = this.props;
        // Use updater function to make sure get the newest state
        // let history = this.props.history;

        this.setState((preState) => {
            this.props.dispatch(loginWithPassword(preState.email,preState.password, this.props.history));
        });
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

LoginForm = withRouter(connect()(LoginForm));
export default LoginForm