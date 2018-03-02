import React, { Component } from 'react';
import logo from './logo.svg';
import '../css/App.css';
import GTPAppBar from './GTPAppBar';
import GTPDrawer from './GTPDrawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainSection from '../sections/MainSection';
import LoginSection from '../sections/LoginSection'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';


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
                            <Route exact path="/" component={MainSection} />
                            <Route exact path="/login" component={LoginSection} />
                        </div>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
