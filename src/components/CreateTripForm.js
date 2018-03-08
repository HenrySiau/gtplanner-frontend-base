import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import axios from 'axios';
import settings from '../config';

const styles = {
    loginButton: {
        margin: '10px 10px 5px 90px'
    }
};

export default class CreateTripForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tripName: '',
            destination: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // toggleLogin = this.props.toggleLogin;

    handleTripNameChange = (event) => {

        this.setState({
            tripName: event.target.value
        });
    };
    handleDestinationChange = (event) => {
        this.setState({
            destination: event.target.value
        });
    };

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        });
    }
    handleSubmit = () => {
        // Use updater function to make sure get the newest state
        // const toggleLogin = this.props.toggleLogin;
        // const history = this.props.history;
        // this.setState((preState) => {
        //     axios.post(settings.serverUrl + '/api/post/signin', {
        //         email: preState.email,
        //         password: preState.password
        //     })
        //         .then(function (response) {
        //             // TODO: Redirect to create my first trip
        //             if(response.data.token){
        //                 localStorage.setItem('id_token', response.data.token);
        //                 toggleLogin();
        //                 history.push('/dashboard');
        //             }
        //         })
        //         .catch(function (error) {
        //             // TODO: show error message and guide user to re submit
        //             console.error(error);
        //         });
        // });
    }

    handleChangeStartDate = (event, date) => {
        console.log(date);
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Trip Name"
                    floatingLabelText="Trip Name"
                    // value={this.state.value}
                    onChange={this.handleEmailChange}
                /><br />
                <TextField
                    hintText="Destination"
                    floatingLabelText="Destination"
                    onChange={this.handleDestinationChange}
                /><br />
                <DatePicker
                    onChange={this.handleChangeStartDate}
                    floatingLabelText="Start Date"
                    autoOk={true}
                    minDate={new Date()}
                // maxDate={this.state.maxDate}
                // disableYearSelection={this.state.disableYearSelection}
                /><br />
                <DatePicker
                    onChange={this.handleChangeStartDate}
                    floatingLabelText="End Date"
                    autoOk={true}
                    minDate={this.state.startDate}
                // maxDate={this.state.maxDate}
                // disableYearSelection={this.state.disableYearSelection}
                /><br />
                {/* BUG: hintText off position */}
                <TextField
                    hintText="Description"
                    floatingLabelText="Description"
                    multiLine={true}
                    rows={2}
                    onChange={this.handleDescriptionChange}
                /><br />
                <RaisedButton
                    label="Create"
                    primary={true}
                    onClick={this.handleSubmit}
                    style={styles.loginButton}
                />
            </div>
        );
    }
}

