import React, { Component } from 'react';
import '../css/App.css';
import GTPDrawer from './GTPDrawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainSection from '../sections/MainSection';
import LoginSection from '../sections/LoginSection';
import RegisterSection from '../sections/RegisterSection';
import DashBoardSection from '../sections/DashBoardSection';
import CreateTripSection from '../sections/CreateTripSection';
import InviteMemberSection from '../sections/InviteMemberSection';
import GtPAppBarContainer from '../containers/GTPAppBarContainer';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import GTPAppBarContainer from '../containers/GTPAppBarContainer';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('id_token') ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpen: false,
            isLogged: localStorage.getItem('id_token') ? true : false
        };
        this.toggleLogout = this.toggleLogout.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer = () => {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    };

    setDrawerState = (open) => {
        this.setState({ isDrawerOpen: open });
    };

    toggleLogout = () => {
        this.setState({ isLogged: false })
    }

    toggleLogin = () => {
        this.setState({ isLogged: true })
    }

    render() {
        return (
            <Router >
                <MuiThemeProvider>
                    <div className="container">
                        <GTPAppBarContainer />
                        <GTPDrawer
                            isDrawerOpen={this.state.isDrawerOpen}
                            toggleDrawer={this.toggleDrawer}
                            setDrawerState={this.setDrawerState}
                        />
                        <div className="mainSection">
                            <Route
                                exact path="/login"
                                render={(props) => (<LoginSection {...props}
                                    toggleLogin={this.toggleLogin} />)}
                            />
                            <Route exact path="/register"
                                render={(props) => (<RegisterSection {...props} toggleLogin={this.toggleLogin}/>)}
                            />
                            {/* <Route exact path="/"
                                render={(props) => (<MainSection {...props} />)}
                            /> */}
                            <PrivateRoute exact path="/dashboard" component={DashBoardSection} />
                            <PrivateRoute exact path="/trip/new" component={CreateTripSection} />
                            <PrivateRoute exact path="/member/invite/:code" component={InviteMemberSection} />
                        </div>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
