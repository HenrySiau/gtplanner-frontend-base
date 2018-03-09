import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import axios from 'axios';
import settings from '../config';
import { orange500, blue500 } from 'material-ui/styles/colors';

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
                    hintStyle={styles.errorStyle}
                    floatingLabelStyle={styles.errorStyle}
                    onChange={this.handleEmailChange}

                /><br />
                <TextField
                    hintText="Destination"
                    floatingLabelText="Destination"
                    onChange={this.handleDestinationChange}
                    hintStyle={styles.hintStyle}
                /><br />
                <DatePicker
                    onChange={this.handleChangeStartDate}
                    floatingLabelText="Start Date"
                    autoOk={true}
                    minDate={new Date()}
                /><br />
                <DatePicker
                    onChange={this.handleChangeStartDate}
                    floatingLabelText="End Date"
                    autoOk={true}
                    minDate={this.state.startDate}

                /><br />
                <TextField
                    hintText="Description"
                    floatingLabelText="Description"
                    multiLine={true}
                    rows={2}
                    onChange={this.handleDescriptionChange}
                    hintStyle={styles.hintStyle}
                    floatingLabelStyle={styles.hintStyle}
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

