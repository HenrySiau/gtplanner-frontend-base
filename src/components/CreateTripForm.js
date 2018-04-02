import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import axios from 'axios';
import settings from '../config';
import { connect } from 'react-redux';
import { snackbarMessage, updateSelectedTripWithInfo } from '../actions';
import { push } from 'react-router-redux';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

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

class CreateTripForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tripName: '',
            description: '',
            startDate: '',
            endDate: ''

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // toggleLogin = this.props.toggleLogin;

    handleTripNameChange = (event) => {
        // TODO: validator length requirement: 
        this.setState({
            tripName: event.target.value
        });
    };

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        });
    }
    handleSubmit = () => {
        this.setState((preState) => {
            axios({
                method: 'POST',
                url: settings.serverUrl + '/api/post/trip/new',
                json: true,
                headers: {
                    'x-access-token': localStorage.getItem('id_token'),
                },
                data: {
                    tripName: preState.tripName,
                    description: preState.description,
                    startDate: preState.startDate,
                    endDate: preState.endDate
                }
            })
                .then((response) => {
                    // TODO: Redirect to create my first trip
                    console.log(response.data);
                    if (response.data.tripInfo) {
                        this.props.dispatch(updateSelectedTripWithInfo(response.data.tripInfo));
                        this.props.dispatch(push('/members/invite/'));
                    }
                })
                .catch((error) => {
                    // TODO: show error message and guide user to re submit
                    console.error(error);
                });
        });
    }

    handleChangeStartDate = (event, date) => {
        console.log(date);
        this.setState({
            startDate: date
        });
    }

    handleChangeEndDate = (event, date) => {
        console.log(date);
        this.setState({
            endDate: date
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
                    onChange={this.handleTripNameChange}

                /><br />
                <DatePicker
                    onChange={this.handleChangeStartDate}
                    floatingLabelText="Start Date"
                    autoOk={true}
                    minDate={new Date()}
                /><br />
                <DatePicker
                    onChange={this.handleChangeEndDate}
                    floatingLabelText="End Date"
                    autoOk={true}
                    minDate={this.state.startDate || new Date()}

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

// const mapStateToProps = (state) => {
//     return {
//         tripId: state.selectedTrip.tripId
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         push: (url) => {
//             dispatch(push(url))
//         },
//         snackbarMessage: (message) => {
//             dispatch(snackbarMessage(message))
//         }
//     }
// }

CreateTripForm = connect()(CreateTripForm);
export default CreateTripForm