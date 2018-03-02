import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
    }

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
    handleLogin = () => {
        alert(this.state.email + this.state.password);
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
                    // value={this.state.value}
                    onChange={this.handlePasswordChange}
                /><br />
                <RaisedButton
                    label="Login"
                    primary={true}
                    onClick={this.handleLogin}
                    style={styles.loginButton} />
            </div>
        );
    }
}

