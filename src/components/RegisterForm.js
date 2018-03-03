/*
Formate required:
 • userName: 3-20 characters
 • email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 • phoneNumber: less than 20 characters
 • password: 

*/
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';

const styles = {
    psdCnfErrStyle: {
        color: orange500,
    },
    popover: {
        width: 270
    },
    loginButton: {
        margin: '10px',
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
            isUserNameFormatIncorrect: false,
            isPopoverOpen: false,


        };
    }
    // styles = {
    //     psdCnfErrStyle: {
    //         color: orange500,
    //     },
    //     popover: {
    //         height: '100px',
    //         width: '270px',
    //         textAlign: 'center',
    //         display: 'flex',
    //     },
    //     loginButton: {
    //         margin: '10px',
    //     }

    // };

    paperStyle = () => {
        return ({
            height: 100,
            width: 270,
            margin: 20,
            textAlign: 'center',
            display: 'flex',
        });
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
        } else {
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
        } else {
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
            password: event.target.value
        });
    };
    showPasswordRequirements = (event) => {
        this.setState({
            isPopoverOpen: true,
            anchorEl: event.currentTarget
        });
    }
    closePasswordRequirements = (event) => {
        this.setState({
            passwordErrMessage: "",
            isPopoverOpen: false
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
                    onBlur={this.closePasswordRequirements}
                /><br />
                <Popover
                    style={styles.popover} 
                    open={this.state.isPopoverOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                >
                    <ul>
                        <li>one</li>
                        <li>two</li>
                        <li>three</li>
                    </ul>
                </Popover>
                <TextField
                    hintText="Confirm Password"
                    floatingLabelText="Confirm Password"
                    type="password"
                    errorText={this.state.passwordCnfErrMessage}
                    errorStyle={styles.psdCnfErrStyle}
                    onChange={this.handleCnfPasswordChange}
                /><br />
                <RaisedButton
                    label="Register"
                    primary={true}
                    onClick={this.handleRegister}
                    style={styles.loginButton} />
            </div>
        );
    }
}

