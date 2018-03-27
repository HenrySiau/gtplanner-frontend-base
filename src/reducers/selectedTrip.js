import { UPDATE_SELECTED_TRIP, SET_INVITE_CODE, REMOVE_INVITE_CODE } from '../actions/actionTypes';
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

export const inviteCode = (state = '', action) => {
    switch (action.type) {
        case SET_INVITE_CODE:
            return action.inviteCode
        case REMOVE_INVITE_CODE:
            return ''
        default:
            return state
    }
}