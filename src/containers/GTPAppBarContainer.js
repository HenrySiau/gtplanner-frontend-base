import {connect} from 'react-redux';
import {login, logout, toggleDrawer} from '../actions';
import GTPAppBar from '../components/GTPAppBar';

const mapStateToProps = (state) => {
    return{
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: () => {
            dispatch(login)
        },
        toggleDrawer: () => {
            dispatch(toggleDrawer)
        },
    }
}

const GTPAppBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GTPAppBar)

export default GTPAppBarContainer;