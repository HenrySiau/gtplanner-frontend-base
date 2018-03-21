import {connect} from 'react-redux';
import {toggleDrawer} from '../actions';
import GTPDrawer from '../components/GTPDrawer';
import { withRouter } from 'react-router-dom';

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

const GTPDrawerContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GTPDrawer))

export default GTPDrawerContainer;