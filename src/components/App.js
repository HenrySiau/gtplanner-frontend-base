import React, { Component } from 'react';
import '../css/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginSection from '../sections/LoginSection';
import RegisterSection from '../sections/RegisterSection';
import DashBoardSection from '../sections/DashBoardSection';
import CreateTripSection from '../sections/CreateTripSection';
import InviteMemberSection from '../sections/InviteMemberSection';
import WelcomeSection from '../sections/WelcomeSection';
import GTPDrawerContainer from '../containers/GTPDrawerContainer';
import GTPSnackbar from '../components/GTPSnackbar';
import {
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
                <MuiThemeProvider>
                    <div className="container">
                        <GTPAppBarContainer />
                        <GTPDrawerContainer />
                        <GTPSnackbar />
                        <div className="mainSection">
                            <Route
                                exact path="/login"
                                render={(props) => (<LoginSection
                                />)}
                            />
                            <Route exact path="/register"
                                render={(props) => (<RegisterSection />)}
                            />
                            <Route exact path="/" component={WelcomeSection} />
                            <PrivateRoute exact path="/dashboard" component={DashBoardSection} />
                            <PrivateRoute exact path="/trip/new" component={CreateTripSection} />
                            <PrivateRoute exact path="/members/invite" component={InviteMemberSection} />
                        </div>
                    </div>
                </MuiThemeProvider>
        );
    }
}

export default App;
