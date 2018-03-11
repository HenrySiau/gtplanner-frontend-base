import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import axios from 'axios';
import settings from '../config';

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
        width: '300px',
        margin: '20px 0 0 0',
    }
};

export default class InviteMemberForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailList: ['henry@gmail.com', 'john@gmail.com'],
            emailToAdd: '',
            emailErrMessage: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // toggleLogin = this.props.toggleLogin;

    handleEmailChange = (event) => {
        this.setState({
            emailToAdd: event.target.value
        });
        if(this.state.emailErrMessage){
            if(event.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
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
        // // Use updater function to make sure get the newest state
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

    handleAddEmail = () => {
        this.emailList = this.state.emailList;
        this.email = this.state.emailToAdd;

        if(this.emailList.includes(this.email)){
            //TODO: flash message: Email already in the list
            this.setState({
                emailToAdd: ''
            });
        }else if(!this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            this.setState({
                emailErrMessage: 'Invalid email format'
            });
        }else{
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
            </div>
        );
    }
}

