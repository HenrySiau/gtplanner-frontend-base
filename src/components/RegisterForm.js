import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    loginButton: {
        margin: '10px 10px 5px 90px'
    }
};

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleUserNameChange = (event) => {
        this.setState({
            userName: event.target.value
        });
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handlePhoneNumberChange = (event) => {
        this.setState({
            phoneNumber: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handleCnfPasswordChange = (event) => {
        this.setState({
        confirmPassword: event.target.value
        });
    };

    handleRegister = () => {
        alert(this.state.email + this.state.password);
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="User Name"
                    floatingLabelText="User Name"
                    onChange={this.handleUserNameChange}
                /><br />
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    onChange={this.handleEmailChange}
                /><br />
                <TextField
                    hintText="Phone Number"
                    floatingLabelText="Phone Number"
                    onChange={this.handlePhoneNumberChange}
                /><br />
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    onChange={this.handlePasswordChange}
                /><br />
                <TextField
                    hintText="Confirm Password"
                    floatingLabelText="Confirm Password"
                    type="password"
                    onChange={this.handleCnfPasswordChange}
                /><br />
                <RaisedButton
                    label="Login"
                    primary={true}
                    onClick={this.handleRegister}
                    style={styles.loginButton} />
            </div>
        );
    }
}

