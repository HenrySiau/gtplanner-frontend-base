import React, { Component } from 'react';
import '../css/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginSection from '../sections/LoginSection';
import RegisterSection from '../sections/RegisterSection';
import DashBoardSection from '../sections/DashBoardSection';
import CreateTripSection from '../sections/CreateTripSection';
import InviteMemberSection from '../sections/InviteMemberSection';
import GTPDrawerContainer from '../containers/GTPDrawerContainer';
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
    }

    render() {
        return (
            <Router >
                <MuiThemeProvider>
                    <div className="container">
                        <GTPAppBarContainer />
                        <GTPDrawerContainer />
                        <div className="mainSection">
                            <Route
                                exact path="/login"
                                render={(props) => (<LoginSection {...props}
                                />)}
                            />
                            <Route exact path="/register"
                                render={(props) => (<RegisterSection {...props} />)}
                            />
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
