import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import axios from 'axios';
import settings from '../config';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import { push } from 'react-router-redux';
import {setInviteCode} from '../actions';

const styles = {
    loginButton: {
        margin: '10px 10px 5px 90px'
    },
    hintStyle: {
        display: 'flex',
        clear: 'both'
    },
    floatingLabelStyle: {
    },
    subHeader: {
        fontSize: 18
    },
    dialogButton: {
        margin: '5px 10px 5px 10px'
    },
};

class InviteCodeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inviteCode: '',
            isDialogOpen: false,
            inviteCodeErrMessage: '',
            tripName: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInviteCodeChange = (event) => {
        this.setState({
            inviteCode: event.target.value
        });
    };

    handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        const that = this;
        // Verify invitation code
        axios({
            method: 'POST',
            url: settings.serverUrl + '/api/post/invite/code/verify',
            json: true,

            data: {
                inviteCode: this.state.inviteCode,
            }
        })
            .then(function (response) {
                // TODO: Redirect to create my first trip
                console.log(response.data);
                if (response.data.success) {
                    that.setState({
                        isDialogOpen: true,
                        tripName: response.data.tripName,
                        inviteCodeErrMessage: ''
                    });
                    that.props.setInviteCode(that.state.inviteCode);
                } else {
                    that.setState({
                        inviteCodeErrMessage: 'Invalid invitation code'
                    });
                }
            })
            .catch(function (error) {
                // TODO: show error message and guide user to re submit
                console.error(error);
            });
    }

    render() {
        const dialogActions = [
            <RaisedButton
                label="Login"
                primary={true}
                onClick={() => { this.props.push('/login') }}
                style={styles.dialogButton}
            />,
            <RaisedButton
                label="Register"
                primary={true}
                onClick={() => { this.props.push('/register') }}
                style={styles.dialogButton}
            />,
        ];

        return (
            <div>
                {/* if user already logged in and have a trip info in redux store */}
                {/* redirect to /dashboard page */}
                {this.props.selectedTripId && <Redirect to="/dashboard" />}
                <Subheader style={styles.subHeader}>Have an invitation code? </Subheader>
                <TextField
                    hintText="Invitation Code"
                    floatingLabelText="Invitation Code"
                    errorText={this.state.inviteCodeErrMessage}
                    onChange={this.handleInviteCodeChange}
                    onKeyPress={this.handlePressEnter}
                /><br />
                <RaisedButton
                    label="Join"
                    primary={true}
                    onClick={this.handleSubmit}
                    style={styles.loginButton}
                />
                <Dialog
                    title={"Welcome to " + this.state.tripName}
                    actions={dialogActions}
                    modal={true}
                    open={this.state.isDialogOpen}
                >
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedTripId: state.selectedTrip.tripId,
        isLoggedIn: state.isLoggedIn
    }
}
const mapDispatchToProps = dispatch => {
    return {
        push: (path) => {
            dispatch(push(path));
        },
        setInviteCode: (inviteCode) =>{
            dispatch(setInviteCode(inviteCode));
        }
    }
}

InviteCodeForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(InviteCodeForm)

export default InviteCodeForm;