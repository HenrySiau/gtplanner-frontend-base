import { UPDATE_SELECTED_TRIP } from '../actions/actionTypes';
const initialState = {
    tripId: '',
    tripName: '',
    members: []
}
export const selectedTrip = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SELECTED_TRIP:
            return {
                tripId: action.tripId,
                tripName: action.tripName,
                members: action.members
            }
            default:
            return state
    }
}