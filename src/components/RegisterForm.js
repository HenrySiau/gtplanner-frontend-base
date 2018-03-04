/*
Format required:
 • userName: 3-20 characters
 • email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 • phoneNumber: less than 20 characters
 • password: 8-30 characters, must contain a lowercase letter, a capital letter and a number

*/
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500, red500, blue500, lightBlue300 } from 'material-ui/styles/colors';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import axios from 'axios';
import settings from '../config';

const styles = {
    psdCnfErrStyle: {
        color: orange500,
    },
    popover: {
        width: 270
    },
    loginButton: {
        margin: '10px 10px 5px 90px'
    },
    valid: {
        color: blue500
    },
    invalid: {
        color: red500
    },
    popoverTitle: {
        color: blue500,
        margin: 10
    },
    popoverHint: {
        color: lightBlue300,
        margin: 10,
        fontSize: '80%'
    },

};

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            email: '',
            phoneNumber: '',
            password: '',
            passwordConfirm: '',
            userNameErrMessage: '',
            passwordErrMessage: '',
            passwordCnfirmErrMessage: '',
            emailErrMessage: '',
            phoneNumberErrmessage: '',
            isEmailFormatIncorrect: false,
            isUserNameFormatIncorrect: false,
            isPopoverOpen: false,
            isPasswordContainaLowercase: false,
            isPasswordContainaCapital: false,
            isPasswordContainaNumber: false,
            isPasswordSatisfyLengthRequirement: false,
        };
    }

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
                emailErrMessage: 'Email format incorrect',
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
    validatePassword = () => {
        if (this.state.isPasswordContainaCapital && this.state.isPasswordContainaLowercase &&
            this.state.isPasswordContainaNumber && this.state.isPasswordSatisfyLengthRequirement) {
            this.setState({
                isPopoverOpen: false
            });
        }
    }
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

        // validate lowercase
        if (event.target.value.match(/[a-z]/g)) {
            this.setState(
                { isPasswordContainaLowercase: true },
                () => this.validatePassword()
            );
        } else {
            this.setState({
                isPasswordContainaLowercase: false
            });
        }
        // validate capital letter
        if (event.target.value.match(/[A-Z]/g)) {
            this.setState(
                { isPasswordContainaCapital: true },
                () => this.validatePassword()
            );
        } else {
            this.setState(
                { isPasswordContainaCapital: false },
                () => this.validatePassword()
            );
        }
        // validate number
        if (event.target.value.match(/[0-9]/g)) {
            this.setState(
                { isPasswordContainaNumber: true },
                () => this.validatePassword()
            );
        } else {
            this.setState({
                isPasswordContainaNumber: false
            });
        }
        //validate length
        if (event.target.value.length > 7 && event.target.value.length < 31) {
            this.setState(
                { isPasswordSatisfyLengthRequirement: true },
                () => this.validatePassword()
            );
        } else {
            this.setState({
                isPasswordSatisfyLengthRequirement: false
            });
        }
        // console.log(this.state.isPasswordContainaCapital + this.state.isPasswordContainaLowercase + this.state.isPasswordContainaNumber + this.state.isPasswordSatisfyLengthRequirement);

    };

    showPasswordRequirements = (event) => {
        this.setState({
            isPopoverOpen: true,
            anchorEl: event.currentTarget
        });
    }

    closePasswordRequirements = (event) => {
        this.setState({
            isPopoverOpen: false
        });
    }

    handlePasswordConfirmChange = (event) => {

        if (event.target.value !== this.state.password) {
            this.setState({
                passwordCnfirmErrMessage: `password doesn't match`
            });
        } else {
            this.setState({
                passwordConfirm: event.target.value,
                passwordCnfirmErrMessage: ''
            });
        }
    };

    handleSubmit = () => {
        // Use updater function to make sure get the newest state
        this.setState((preState) => {

            axios.post(settings.serverUrl + '/api/post/register', {
                userName: preState.userName,
                email: preState.email,
                phoneNumber: preState.phoneNumber,
                password: preState.password,
                passwordConfirm: preState.passwordConfirm


            })
                .then(function (response) {
                    // TODO: Redirect to create my first trip
                    console.log(response);
                })
                .catch(function (error) {
                    // TODO: show error message and guide user to re submit
                    console.log(error);
                });
        });

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
                    animation={PopoverAnimationVertical}
                    onRequestClose={this.closePasswordRequirements}
                >
                    <p style={styles.popoverTitle}>Password must contain:</p>
                    <ul>
                        <li style={this.state.isPasswordContainaLowercase ? styles.valid : styles.invalid}>
                            a lowercase letter</li>
                        <li style={this.state.isPasswordContainaCapital ? styles.valid : styles.invalid}>
                            a CAPITAL letter</li>
                        <li style={this.state.isPasswordContainaNumber ? styles.valid : styles.invalid}>
                            a number</li>
                        <li style={this.state.isPasswordSatisfyLengthRequirement ? styles.valid : styles.invalid}>
                            8 to 30 characters</li>
                    </ul>
                    <p style={styles.popoverHint}>Click anywhere to close this window</p>
                </Popover>
                <TextField
                    hintText="Confirm Password"
                    floatingLabelText="Confirm Password"
                    type="password"
                    errorText={this.state.passwordCnfirmErrMessage}
                    errorStyle={styles.psdCnfErrStyle}
                    onChange={this.handlePasswordConfirmChange}
                /><br />
                <RaisedButton
                    label="Register"
                    primary={true}
                    onClick={this.handleSubmit}
                    style={styles.loginButton} />
            </div>
        );
    }
}

