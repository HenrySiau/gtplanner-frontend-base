import {connect} from 'react-redux';
import {toggleDrawer} from '../actions';
import GTPDrawer from '../components/GTPDrawer';

const mapStateToProps = (state) => {
    return{
        isDrawerOpen: state.isDrawerOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDrawer: () => {
            dispatch(toggleDrawer)
        }
    }
}

const GTPDrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GTPDrawer)

export default GTPDrawerContainer;