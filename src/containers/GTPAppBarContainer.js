import {connect} from 'react-redux';
import {login, logout, toggleDrawer, validateJWT} from '../actions';
import GTPAppBar from '../components/GTPAppBar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
    return{
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: () => {
            dispatch(login);
        },
        logout: () => {
            dispatch(logout);
        },
        toggleDrawer: () => {
            dispatch(toggleDrawer);
        },
        validateJWT: (token) =>{
            dispatch(validateJWT(token));
        }
    }
}

const GTPAppBarContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GTPAppBar))

export default GTPAppBarContainer;