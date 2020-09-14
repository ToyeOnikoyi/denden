//import ws  from './components';
import density from './api'
import { MESSAGE_SENT, MESSAGE_RECEIVED, GET_SPACES,GET_SOCKET } from './types';

// Send message
// export const sendMsg = data => {
//     return dispatch => {
//         console.log("actions send message");
//         dispatch(sentMsg(data));
//         ws.send(data);
//     }
// }

export const recieveMsg = data => {
    return dispatch => {
        console.log("actions receive message");
        dispatch(receivedMsg(data));
    }
}

export const getSpaces =   data => {
    console.log('actions::getSpaces: 1')
    return   dispatch => {
        console.log('actions::getSpaces: 2')
        
            density.get('/spaces',{
                params: {
                    limit: 20
                }
            })
            .then(resp => {
                console.log('actions::getSpaces: 3')
                dispatch(gotSpaces(resp.data))
            })
            
            console.log('actions::getSpaces: 4')

    }
}

export const getSocket =   data => {

    return   dispatch => {
        
            density.post('/sockets')
            .then(resp => {
                console.log('getSocket: ',resp.data)
                dispatch(gotSocket(resp.data))
            })
            .catch((err) => {
                console.log('getSocket error: ',err)
            })

    }
} 


const receivedMsg = data => {
    return {
        type: MESSAGE_RECEIVED,
        payload: data
    }
}

const gotSpaces = data => {
    return {
        type: GET_SPACES,
        payload: data
    }
}

const gotSocket = data => {
    return {
        type: GET_SOCKET,
        payload: data
    }
}