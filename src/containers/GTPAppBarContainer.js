import {connect} from 'react-redux';
import {logout, toggleDrawer, validateJWT, updateSelectedTrip} from '../actions';
import GTPAppBar from '../components/GTPAppBar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
    return{
        isLoggedIn: state.isLoggedIn,
        selectedTrip: state.selectedTrip
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout);
        },
        toggleDrawer: () => {
            dispatch(toggleDrawer);
        },
        validateJWT: (token) =>{
            dispatch(validateJWT(token));
        },
        updateSelectedTrip: (tripId) => {
            dispatch(updateSelectedTrip(tripId));
        }
    }
}

const GTPAppBarContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GTPAppBar))

export default GTPAppBarContainer;