import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import axios from 'axios';
import settings from '../config';
import validator from './Validator';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { snackbarMessage } from '../actions';
import { push } from 'react-router-redux';

const styles = {
    loginButton: {
        margin: '10px 10px 5px 90px'
    },
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '250px',
        margin: '20px 0 0 0',
    },
    dialogButton: {
        margin: '5px 10px 5px 10px'
    }
};

class InviteMemberForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailList: [],
            emailToAdd: '',
            emailErrMessage: '',
            message: '',
            subject: ''
        };
        const toggleDialogOpen = this.toggleDialogOpen;
    }

    handleEmailChange = (event) => {
        this.setState({
            emailToAdd: event.target.value
        });
        if (this.state.emailErrMessage) {
            if (validator.emailFormatOK(event.target.value)) {
                this.setState({
                    emailErrMessage: ''
                });
            }
        }
    };

    handleMessageChange = (event) => {
        this.setState({
            message: event.target.value
        });
    }

    handleSubjectChange = (event) => {
        this.setState({
            subject: event.target.value
        });
    }

    handleRequestDelete = (email) => {
        this.emailList = this.state.emailList;
        this.emailList.splice(email, 1);
        this.setState({ emailList: this.emailList });
    };

    renderChip(email) {
        return (
            <Chip
                key={email}
                onRequestDelete={() => this.handleRequestDelete(email)}
                style={styles.chip}
            >
                {email}
            </Chip>
        );
    }

    handleSubmit = () => {
        if (this.props.invitationCode) {
            axios({
                method: 'POST',
                url: settings.serverUrl + '/api/post/members/invite',
                json: true,
                headers: {
                    'x-access-token': localStorage.getItem('id_token'),
                },
                data: {
                    invitationCode: this.props.invitationCode,
                    tripId: this.props.tripId,
                    emailList: this.state.emailList,
                    message: this.state.message,
                    subject: this.state.subject
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        console.log(response.data);
                        this.props.push('/dashboard');
                        this.props.snackbarMessage('You had successfully invited ' + response.data.numberOfEmails + ' members');
                    } else {
                        this.props.snackbarMessage('something went wrong please try again');
                    }
                })
                .catch((error) => {
                    this.props.snackbarMessage('Some went wrong...');
                });
        }

    }

    handleAddEmail = () => {
        this.emailList = this.state.emailList;
        this.email = this.state.emailToAdd;

        if (this.emailList.includes(this.email)) {
            //TODO: flash message: Email already in the list
            this.setState({
                emailToAdd: ''
            });
        } else if (!validator.emailFormatOK(this.email)) {
            this.setState({
                emailErrMessage: 'Invalid email format'
            });
        } else {
            this.emailList.push(this.email);
            this.setState({
                emailList: this.emailList,
                emailToAdd: ''
            });
        }
    }

    handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleAddEmail();
        }
    }

    render() {
        const dialogActions = [
            <RaisedButton
                label="Create a new Trip"
                primary={true}
                onClick={() => { this.props.push('/trip/new') }}
                style={styles.dialogButton}
            />,
            <RaisedButton
                label="Joint a trip with invitation code"
                primary={true}
                onClick={() => { this.props.push('/trip/join') }}
                style={styles.dialogButton}
            />,
        ];
        return (
            <div>
                
                {/* {tripName? <p>Trip Name: {tripName}</p> : <div></div>} */}
                {/* <p>Invitation Code: {this.props.invitationCode && this.props.invitationCode}</p> */}
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    onChange={this.handleEmailChange}
                    onKeyPress={this.handlePressEnter}
                    value={this.state.emailToAdd}
                    errorText={this.state.emailErrMessage}
                /><br />
                <RaisedButton
                    label="Add"
                    primary={true}
                    onClick={this.handleAddEmail}
                    style={styles.loginButton}
                /><br />
                <TextField
                    hintText="Subject"
                    floatingLabelText="Subject"
                    onChange={this.handleSubjectChange}
                /><br />
                <TextField
                    hintText="Message"
                    floatingLabelText="Message"
                    multiLine={true}
                    rows={2}
                    onChange={this.handleMessageChange}
                /><br />
                {this.state.emailList.length > 0 &&
                    <div>
                        <div style={styles.wrapper}>
                            {this.state.emailList && this.state.emailList.map(this.renderChip, this)}
                        </div>
                        <RaisedButton
                            label="Invite"
                            primary={true}
                            onClick={this.handleSubmit}
                            style={styles.loginButton}
                        /> </div>
                }
                
                <Dialog
                    title="You don't have a trip yet"
                    actions={dialogActions}
                    open={this.props.invitationCode ? false : true}
                >
                    please choose your next step.
        </Dialog>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        invitationCode: state.selectedTrip.invitationCode,
        tripId: state.selectedTrip.tripId,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        push: (url) => {
            dispatch(push(url))
        },
        snackbarMessage: (message) => {
            dispatch(snackbarMessage(message))
        }
    }
}

InviteMemberForm = connect(mapStateToProps, mapDispatchToProps)(InviteMemberForm);
export default InviteMemberForm