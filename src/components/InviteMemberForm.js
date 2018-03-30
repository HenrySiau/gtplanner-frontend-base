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
    },
    inputNewCode: {
        margin: '5px 10px 5px 30px'
    }
};

class InviteMemberForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailList: [],
            emailToAdd: '',
            emailErrMessage: '',
            inviteCode: ''
        };

        // TODO Do I need to bind all methods?
        this.handleSubmit = this.handleSubmit.bind(this);
        const toggleDialogOpen = this.toggleDialogOpen;
    }

    componentDidMount = () => {

        let tripId = this.props.tripId;
        console.log('tripId: ' + tripId);
        if (tripId) {
            // get invite code with JWS and tripId
            const that = this;
            axios({
                method: 'GET',
                url: settings.serverUrl + '/api/get/invitecode',
                json: true,
                headers: {
                    'x-access-token': localStorage.getItem('id_token'),
                },
                params: {
                    tripId: tripId
                }
            })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.inviteCode) {
                        that.setState({
                            inviteCode: response.data.inviteCode
                        });
                    }
                })
                .catch(function (error) {
                    that.props.snackbarMessage('Some went wrong');

                });
        } else {
            this.props.snackbarMessage('You don not have a trip yet');
            this.props.push('/trip/new');
        }

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
        if (this.state.inviteCode) {
            const that = this;
            let numberOfEmails = this.state.emailList.length;
            axios({
                method: 'POST',
                url: settings.serverUrl + '/api/post/members/invite',
                json: true,
                headers: {
                    'x-access-token': localStorage.getItem('id_token'),
                },
                data: {
                    inviteCode: this.state.inviteCode,
                    emailList: this.state.emailList
                }
            })
                .then(function (response) {
                    if (response.data.success) {
                        console.log(response.data);
                        that.props.snackbarMessage('You had successfully invited ' + numberOfEmails + ' members');
                        that.props.push('/dashboard')
                    }else{
                        that.props.snackbarMessage('something went wrong please try again');
                    }
                })
                .catch(function (error) {
                    that.props.snackbarMessage('Some went wrong...');
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
        return (
            <div>
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
                <br />
                {/* {tripName? <p>Trip Name: {tripName}</p> : <div></div>} */}
                <p>Invitation Code: {this.state.inviteCode}</p>
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
                />

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tripId: state.selectedTrip.tripId
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