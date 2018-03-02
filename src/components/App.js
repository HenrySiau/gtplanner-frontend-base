import React, { Component } from 'react';
import logo from './logo.svg';
import '../css/App.css';
import GTPAppBar from './GTPAppBar';
import GTPDrawer from './GTPDrawer';
import Login from './Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
                        <div className="loginSection">
                            <Login />
                        </div>
                    </div>

                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
