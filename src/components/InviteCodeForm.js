import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import axios from 'axios';
import settings from '../config';

// is user logged in?
// does user has an active trip? 
// if user does not has active trip at /dashboard will redirect to home page
// if user has active trip at home page will direct to dashboard

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
};

export default class InviteCodeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inviteCode: '',
            isDialogOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
componentWillMount = ()=>{
    // if user has active trip at home page will direct to dashboard
}

    // toggleLogin = this.props.toggleLogin; 

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
        this.setState((preState) => {
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
                        this.setState({
                            isDialogOpen: true
                        });
                    }
                })
                .catch(function (error) {
                    // TODO: show error message and guide user to re submit
                    console.error(error);
                });
        });
    }


    render() {
        return (
            <div>
                <h4>Have an invitation code? </h4>
                <TextField
                    hintText="Invitation Code"
                    floatingLabelText="Invitation Code"
                    onChange={this.handleInviteCodeChange}
                    onKeyPress={this.handlePressEnter}
                /><br />
               
                <RaisedButton
                    label="Join"
                    primary={true}
                    onClick={this.handleSubmit}
                    style={styles.loginButton}
                />
            </div>
        );
    }
}

