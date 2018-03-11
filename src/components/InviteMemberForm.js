import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import axios from 'axios';
import settings from '../config';
import validator from './Validator';
import Dialog from 'material-ui/Dialog';

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
    inputNewCode:{
        margin: '5px 10px 5px 30px'
    }
};

export default class InviteMemberForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailList: [],
            emailToAdd: '',
            emailErrMessage: '',
            isDialogOpen: false
        };
        // TODO Do I need to bind all methods?
        this.handleSubmit = this.handleSubmit.bind(this);

        const toggleDialogOpen = this.toggleDialogOpen;
        axios.post(settings.serverUrl + '/api/post/invite/code/verify', {
            code: this.props.match.params.code,
        })
            .then(function (response) {
                // TODO: get trip name and show it on page
                if (response.data) {
                    console.log(response.data);
                }
            })
            .catch(function (error) {
                toggleDialogOpen();
            });
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

    toggleDialogOpen = () => {
        this.setState({
            isDialogOpen: true
        });
    }

    render() {
        const dialogActions = [
            <RaisedButton
                label="Use New Code"
                primary={true}
                onClick={this.createNewTrip}
                style={styles.dialogButton}
            />,
            <RaisedButton
                label="Go to home page"
                primary={true}
                onClick={this.goToDashboard}
                style={styles.dialogButton}
            />,
        ];



        return (
            <div>
                {/* <Chip
                    key={data.key}
                    onRequestDelete={() => this.handleRequestDelete(data.key)}
                    style={this.styles.chip}
                >
                    {data.label}
                </Chip>
                <br /> */}
                {this.state.emailList.length > 0 ?
                    <div>
                        <div style={styles.wrapper}>
                            {this.state.emailList.map(this.renderChip, this)}
                        </div>
                        <RaisedButton
                            label="Invite"
                            primary={true}
                            onClick={this.handleSubmit}
                            style={styles.loginButton}
                        /> </div> : <div></div>
                }
                <br />
                {/* {tripName? <p>Trip Name: {tripName}</p> : <div></div>} */}
                <p>Invitation Code: {this.props.match.params.code}</p>
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
                <Dialog
                    title="Incorrect or expired invitation code"
                    actions={dialogActions}
                    modal={true}
                    open={this.state.isDialogOpen}
                >
                    please double check and re-submit your invitation code.
                    <br />
                    <TextField
                    hintText="New Code"
                    floatingLabelText="New Code"
                    onChange={this.handleEmailChange}
                    onKeyPress={this.handlePressEnter}
                    style={styles.dialogButton}
                />
        </Dialog>
            </div>
        );
    }
}

