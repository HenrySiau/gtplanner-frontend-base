import { connect } from 'react-redux';
import { toggleDrawer, updateSelectedTrip } from '../actions';
import GTPDrawer from '../components/GTPDrawer';

const trips = [
    {
        tripName: 'Trip One',
        tripId: '123'
    },
    {
        tripName: 'Trip two',
        tripId: '124'
    },
    {
        tripName: 'Trip three',
        tripId: '125'
    },
]

const mapStateToProps = (state) => {
    return {
        isDrawerOpen: state.isDrawerOpen,
        trips: trips
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDrawer: () => {
            dispatch(toggleDrawer);
        },
        updateSelectedTrip: (tripId) => {
            dispatch(updateSelectedTrip(tripId));
        }
    }
}

const GTPDrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GTPDrawer)

export default GTPDrawerContainer;