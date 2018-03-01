import React, { Component } from 'react';
import logo from './logo.svg';
import '../css/App.css';
import GTPAppBar from './GTPAppBar';
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

    render() {
        return (
            <div className="container">
                <MuiThemeProvider>
                    <GTPAppBar
                        toggleDrawer={this.toggleDrawer}
                        logged={this.state.logged}
                    />
                </MuiThemeProvider >
            </div>
        );
    }
}

export default App;
