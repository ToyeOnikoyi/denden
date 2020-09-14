import { combineReducers } from 'redux';
import { MESSAGE_SENT, MESSAGE_RECEIVED, GET_SPACES } from './types';

INITIAL_STATE = {
    receivedMsg: "None",
    spaces: {},
}
const socketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MESSAGE_SENT:
            return { ...state, receivedMsg: action.payload }
        case MESSAGE_RECEIVED:
            return { ...state, receivedMsg: action.payload }
        case GET_SPACES:
            console.log('here in redux')
            return {...state, spaces: action.payload}
        default:
            return state;
    }
}

export default combineReducers({
    socket: socketReducer
})