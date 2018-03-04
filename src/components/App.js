import React, { Component } from 'react';
import '../css/App.css';
import GTPAppBar from './GTPAppBar';
import GTPDrawer from './GTPDrawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainSection from '../sections/MainSection';
import LoginSection from '../sections/LoginSection'
import RegisterSection from '../sections/RegisterSection'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';



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
    
    toggleLogout = ()=>{
        this.setState({isLogged: false})
    }

    toggleLogin = ()=>{
        this.setState({isLogged: true})
    }

    render() {
        return (
            <Router>
                <MuiThemeProvider>
                    <div className="container">

                        <GTPAppBar
                            toggleDrawer={this.toggleDrawer}
                            isLogged={this.state.isLogged}
                            toggleLogout={this.toggleLogout}
                        />
                        <GTPDrawer
                            isDrawerOpen={this.state.isDrawerOpen}
                            toggleDrawer={this.toggleDrawer}
                            setDrawerState={this.setDrawerState}
                        />

                        <div className="mainSection">
                            <Route exact path="/" component={MainSection} />
                            <Route exact path="/login" component={()=>(<LoginSection toggleLogin={this.toggleLogin}/>)} />
                            <Route exact path="/register" component={RegisterSection} />
                        </div>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
