import React, { Component } from 'react';
import logo from './logo.svg';
import '../css/App.css';
import GTPAppBar from './GTPAppBar';
import GTPDrawer from './GTPDrawer';
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
            <div className="container">
                <MuiThemeProvider>
                    <GTPAppBar
                        toggleDrawer={this.toggleDrawer}
                        logged={this.state.logged}
                    />
                </MuiThemeProvider >

                 <MuiThemeProvider>
                        <GTPDrawer
                            isDrawerOpen={this.state.isDrawerOpen}
                            toggleDrawer={this.toggleDrawer}
                            setDrawerState={this.setDrawerState}
                        />
                    </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
