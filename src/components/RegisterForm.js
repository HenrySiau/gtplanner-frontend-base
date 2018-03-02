import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500 } from 'material-ui/styles/colors';

const styles = {
    psdCnfErrStyle: {
        color: orange500,
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
            confirmPassword: '',
            userNameErrMessage: '',
            passwordErrMessage: '',
            passwordCnfErrMessage: '',
            emailErrMessage: '',
            phoneNumberErrmessage: '',
            isEmailFormatIncorrect: false,
            isUserNameFormatIncorrect: false

        };
    }

    ValidateEmailFormat(email) {
        if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            this.setState({
                emailErrMessage: '',
                isEmailFormatIncorrect: false
            });
        } else {
            this.setState({
                emailErrMessage: 'Email formate incorrect',
                isEmailFormatIncorrect: true
            });
        }
    };
    checkEmailFormat = (event) => {
        this.ValidateEmailFormat(this.state.email);
    }
    ValidateEmailAvailable(email) {
        //TODO check with server if Email is already been used.
    }
    ValidateUserNameFormat = (event) => {
        if (this.state.userName.length < 3 || this.state.userName.length > 21) {
            this.setState({
                isUserNameFormatIncorrect: true,
                userNameErrMessage: 'User Name must be shorter than 20 charactors and longer than 2 charactors'
            });
        }else{
            this.setState({
                isUserNameFormatIncorrect: false,
                userNameErrMessage: ''
            });
        }
    };

    handleUserNameChange = (event) => {
        this.setState({
            userName: event.target.value,
        });

        if (this.state.isUserNameFormatIncorrect) {

            if (event.target.value.length < 21 && event.target.value.length > 2) {
                this.setState({
                    userNameErrMessage: '',
                    isUserNameFormatIncorrect: false
                });
            }
        }else{
            if (event.target.value.length > 21) {
                this.setState({
                    userNameErrMessage: 'User Name must be shorter than 20 charactors and longer than 2 charactors',
                    isUserNameFormatIncorrect: true
                });
            }
        }
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
        if (this.state.isEmailFormatIncorrect) {
            this.ValidateEmailFormat(event.target.value);
        }
    };

    handlePhoneNumberChange = (event) => {
        // validate phone number could be a big project
        // because different county have different phone number patten
        // here we skip this part
        this.setState({
            phoneNumber: event.target.value,

        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            passwordErrMessage: "Password must..."
        });
    };
    showPasswordRequirements = () => {
        this.setState({
            passwordErrMessage: "Password must..."
        });
    }

    handleCnfPasswordChange = (event) => {

        if (event.target.value != this.state.password) {
            this.setState({
                passwordCnfErrMessage: `password doesn't match`
            });
        } else {
            this.setState({
                confirmPassword: event.target.value,
                passwordCnfErrMessage: ''
            });
        }
    };




    handleRegister = () => {
        this.ValidateEmailFormat(this.state.email)

    }

    render() {
        return (
            <div>
                <TextField
                    hintText="User Name"
                    floatingLabelText="User Name"
                    onChange={this.handleUserNameChange}
                    errorText={this.state.userNameErrMessage}
                    onBlur={this.ValidateUserNameFormat}
                /><br />
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    errorText={this.state.emailErrMessage}
                    onChange={this.handleEmailChange}
                    onBlur={this.checkEmailFormat}
                /><br />
                <TextField
                    hintText="Phone Number"
                    floatingLabelText="Phone Number"
                    errorText={this.state.phoneNumberErrmessage}
                    onChange={this.handlePhoneNumberChange}
                    onChange={this.handleUserNameChange}

                /><br />
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    errorText={this.state.passwordErrMessage}
                    onChange={this.handlePasswordChange}
                    onFocus={this.showPasswordRequirements}
                /><br />
                <TextField
                    hintText="Confirm Password"
                    floatingLabelText="Confirm Password"
                    type="password"
                    errorText={this.state.passwordCnfErrMessage}
                    errorStyle={styles.psdCnfErrStyle}
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

