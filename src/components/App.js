import React, { Component } from 'react';
import logo from './logo.svg';
import '../css/App.css';
import GTPAppBar from './GTPAppBar';
import GTPDrawer from './GTPDrawer';
import Login from './Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

const Home = () => (
    <div>
        <h1>To be fill with Chat room and other tools</h1>
    </div>
);

const LoginSection = () => (
    <div className="loginSection">
        <Login />
    </div>
);

const RegisterSection = () => (
    <div>
        <h1>Register</h1>
    </div>
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpen: false,
            logged: false
        };
    }

    toggleDrawer = () => {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    };

    setDrawerState = (open) => {
        this.setState({ isDrawerOpen: open });
    };

    render() {
        return (
            <Router>
                <MuiThemeProvider>
                    <div className="container">

                        <GTPAppBar
                            toggleDrawer={this.toggleDrawer}
                            logged={this.state.logged}
                        />
                        <GTPDrawer
                            isDrawerOpen={this.state.isDrawerOpen}
                            toggleDrawer={this.toggleDrawer}
                            setDrawerState={this.setDrawerState}
                        />

                        <div className="mainSection">

                            {/* <Route path="/login" component={LoginSection} /> */}
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={LoginSection} />
                        </div>

                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
