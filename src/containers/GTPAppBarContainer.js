import {connect} from 'react-redux';
import {login, logout} from '../actions';
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
        }
    }
}

const GTPAppBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GTPAppBar)

export default GTPAppBarContainer;