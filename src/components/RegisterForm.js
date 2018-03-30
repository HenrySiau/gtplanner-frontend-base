import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500, red500, blue500, lightBlue300 } from 'material-ui/styles/colors';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import axios from 'axios';
import settings from '../config';
import validator from './Validator';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { loginWithToken } from '../actions';
import { push } from 'react-router-redux';
import { snackbarMessage } from '../actions';

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
    dialogButton: {
        margin: '0 10px 0 10px'
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


class RegisterForm extends React.Component {
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
            passwordConfirmErrMessage: '',
            emailErrMessage: '',
            phoneNumberErrMessage: '',
            isEmailFormatIncorrect: false,
            isUserNameFormatIncorrect: false,
            isPopoverOpen: false,
            isPasswordContainLowercase: false,
            isPasswordContainCapital: false,
            isPasswordContainNumber: false,
            isPasswordSatisfyLengthRequirement: false,
            isDialogOpen: false,
        };
    }
    componentDidMount = () => {
        this.setState({
            anchorEl: document.querySelector('#passwordInputField')
        });
    }

    strip(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }
    isFormReady = () => {
        if(!this.state.isEmailFormatIncorrect && !this.state.isUserNameFormatIncorrect
            && this.state.isPasswordContainLowercase && this.state.isPasswordContainCapital
            && this.state.isPasswordContainNumber && this.state.isPasswordSatisfyLengthRequirement
        ){
            return true
        }else {
            return false
        }
    }

    ValidateEmailAvailable = () => {
        let email = this.strip(this.state.email);
        if (validator.emailFormatOK(email)) {
            this.setState({
                emailErrMessage: '',
                isEmailFormatIncorrect: false
            });
            let that = this;
            axios.post(settings.serverUrl + '/api/post/email/exist', {
                email: email,
            })
                .then(function (response) {
                    if (response.data.exist) {
                        that.setState({
                            emailErrMessage: 'This Email already registered',
                        });
                    }
                })
                .catch(function (error) {
                    // TODO: show error message and guide user to re submit
                    console.log(error);
                    console.log(error.response);
                });


        } else {
            this.setState({
                emailErrMessage: 'Email format incorrect',
                isEmailFormatIncorrect: true
            });
        }
    }

    ValidateEmailFormat = (email) => {
        if (validator.emailFormatOK(this.strip(email))) {
            return true
        } else {
            return false
        }
    }

    ValidateUserNameFormat = (event) => {
        if (this.state.userName.length < 2 || this.state.userName.length > 21) {
            this.setState({
                isUserNameFormatIncorrect: true,
                userNameErrMessage: 'User Name must be shorter than 20 characters and longer than 1 characters'
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

            if (event.target.value.length < 21 && event.target.value.length > 1) {
                this.setState({
                    userNameErrMessage: '',
                    isUserNameFormatIncorrect: false
                });
            }
        } else {
            if (event.target.value.length > 21) {
                this.setState({
                    userNameErrMessage: 'User Name must be shorter than 20 characters and longer than 1 characters',
                    isUserNameFormatIncorrect: true,
                });
            }
        }
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
        if (this.state.isEmailFormatIncorrect) {
            if (this.ValidateEmailFormat(event.target.value)) {
                this.setState({
                    isEmailFormatIncorrect: false,
                    emailErrMessage: ''
                });
            }
        }
    };
    validatePassword = () => {
        if (this.state.isPasswordContainCapital && this.state.isPasswordContainLowercase &&
            this.state.isPasswordContainNumber && this.state.isPasswordSatisfyLengthRequirement) {
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
                { isPasswordContainLowercase: true },
                () => this.validatePassword()
            );
        } else {
            this.setState({
                isPasswordContainLowercase: false
            });
        }
        // validate capital letter
        if (event.target.value.match(/[A-Z]/g)) {
            this.setState(
                { isPasswordContainCapital: true },
                () => this.validatePassword()
            );
        } else {
            this.setState(
                { isPasswordContainCapital: false },
                () => this.validatePassword()
            );
        }
        // validate number
        if (event.target.value.match(/[0-9]/g)) {
            this.setState(
                { isPasswordContainNumber: true },
                () => this.validatePassword()
            );
        } else {
            this.setState({
                isPasswordContainNumber: false
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
    };

    showPasswordRequirements = (event) => {
        this.setState({
            // anchorEl: event.currentTarget,
            isPopoverOpen: true,

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
                passwordConfirmErrMessage: `password doesn't match`
            });
        } else {
            this.setState({
                passwordConfirm: event.target.value,
                passwordConfirmErrMessage: ''
            });
        }
    };

    handleSubmit = () => {
        if(this.isFormReady()){
            let { dispatch } = this.props;
            const handleDialogOpen = this.handleDialogOpen;
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
                        if (response.data.token) {
                            dispatch(loginWithToken(response.data.token));
                            handleDialogOpen();
                        }
                    })
                    .catch(function (error) {
                        this.props.dispatch(snackbarMessage('Something went wrong, can not register, please try later'));
                    });
            });
        }else{
            this.props.dispatch(snackbarMessage('Please fill the form properly'));
        }


    }

    handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleDialogClose = () => {
        this.setState({
            isDialogOpen: false
        });
    }

    handleDialogOpen = () => {
        this.setState({
            isDialogOpen: true
        });
    }

    createNewTrip = () => {
        this.props.dispatch(push('/trip/new'));
        this.setState({
            isDialogOpen: false
        });
    }

    goToMyAccount = () => {
        this.props.dispatch(push('/myaccount'));
        this.setState({
            isDialogOpen: false
        });
    }

    render() {
        const dialogActions = [
            <RaisedButton
                label="Create a new Trip"
                primary={true}
                onClick={this.createNewTrip}
                style={styles.dialogButton}
            />,
            <RaisedButton
                label="Setup my profile"
                primary={true}
                onClick={this.goToMyAccount}
                style={styles.dialogButton}
            />,
        ];

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
                    onBlur={this.ValidateEmailAvailable}
                /><br />
                <TextField
                    hintText="Phone Number"
                    floatingLabelText="Phone Number"
                    errorText={this.state.phoneNumberErrMessage}
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
                    id='passwordInputField'
                /><br />
                <Popover
                    style={styles.popover}
                    open={this.state.isPopoverOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
                    onRequestClose={this.closePasswordRequirements}
                >
                    <p style={styles.popoverTitle}>Password must contain:</p>
                    <ul>
                        <li style={this.state.isPasswordContainLowercase ? styles.valid : styles.invalid}>
                            a lowercase letter</li>
                        <li style={this.state.isPasswordContainCapital ? styles.valid : styles.invalid}>
                            a CAPITAL letter</li>
                        <li style={this.state.isPasswordContainNumber ? styles.valid : styles.invalid}>
                            a number</li>
                        <li style={this.state.isPasswordSatisfyLengthRequirement ? styles.valid : styles.invalid}>
                            8 to 30 characters</li>
                    </ul>
                    <p style={styles.popoverHint}>Click anywhere to close this window</p>
                </Popover>
                <br />
                <TextField
                    hintText="Confirm Password"
                    floatingLabelText="Confirm Password"
                    type="password"
                    errorText={this.state.passwordConfirmErrMessage}
                    errorStyle={styles.psdCnfErrStyle}
                    onChange={this.handlePasswordConfirmChange}
                    onKeyPress={this.handlePressEnter}
                /><br />
                <RaisedButton
                    label="Register"
                    primary={true}
                    onClick={this.handleSubmit}
                    style={styles.loginButton} />

                <Dialog
                    title="Welcome to GT Planner"
                    actions={dialogActions}
                    modal={true}
                    open={this.state.isDialogOpen}
                >
                    Your account had successfully set up, please choose your next step.
        </Dialog>
            </div>
        );
    }
}

RegisterForm = connect()(RegisterForm);
export default RegisterForm;