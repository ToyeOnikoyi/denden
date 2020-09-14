import { combineReducers } from 'redux';
import { MESSAGE_SENT, MESSAGE_RECEIVED, GET_SPACES,GET_SOCKET } from './types';

INITIAL_STATE = {
    receivedMsg: "None",
    spaces: {},
    socket: {url:null},
}
const socketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MESSAGE_SENT:
            return { ...state, receivedMsg: action.payload }
        case MESSAGE_RECEIVED:
            return { ...state, receivedMsg: action.payload }
        case GET_SPACES:
            return {...state, spaces: action.payload}
        case GET_SOCKET:
            return {...state, socket: action.payload}
        default:
            return state;
    }
}

export default combineReducers({
    socket: socketReducer
})