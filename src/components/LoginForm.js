import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import settings from '../config';

const styles = {
    loginButton: {
        margin: '10px 10px 5px 90px'
    }
};

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    // toggleLogin = this.props.toggleLogin;

    handleEmailChange = (event) => {
        
        this.setState({
            email: event.target.value
        });
    };
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };
    handleSubmit = () => {
                // Use updater function to make sure get the newest state
                const toggleLogin = this.props.toggleLogin;
                this.setState((preState) => {
                    axios.post(settings.serverUrl + '/api/post/signin', {
                        email: preState.email,
                        password: preState.password
                    })
                        .then(function (response) {
                            // TODO: Redirect to create my first trip
                            if(response.data.token){
                                localStorage.setItem('id_token', response.data.token);
                                toggleLogin();
                                // window.location="/"
                            }
                        })
                        .catch(function (error) {
                            // TODO: show error message and guide user to re submit
                            console.error(error);
                        });
                });
    }

    handlePressEnter = (e)=>{
        if(e.key === 'Enter'){
            this.handleSubmit();
        }
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    // value={this.state.value}
                    onChange={this.handleEmailChange}
                /><br />
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    onChange={this.handlePasswordChange}
                    onKeyPress={this.handlePressEnter}
                /><br />
                <RaisedButton
                    label="Login"
                    primary={true}
                    onClick={this.handleSubmit}
                    style={styles.loginButton} 
                    />
            </div>
        );
    }
}

