import ws  from './socket';
import density from './api'
import { MESSAGE_SENT, MESSAGE_RECEIVED, GET_SPACES } from './types';

// Send message
export const sendMsg = data => {
    return dispatch => {
        console.log("actions send message");
        dispatch(sentMsg(data));
        ws.send(data);
    }
}

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
            //console.log('actions::getSpaces: ',JSON.stringify(response.data)) 

    }
}

// export const getCounts =   data => {
    
//     return   dispatch => {
//             density.get('/spaces',{
//                 params: {
//                     limit: 20
//                 }
//             })
//             .then(resp => {
//                 resp.data.results.map()
//                 density.get(`/${resp.data}/counts`)
//                 dispatch(gotSpaces(resp.data))
//             })
            
           
//             //console.log('actions::getSpaces: ',JSON.stringify(response.data)) 

//     }
// }

const sentMsg = data => {
    return {
        type: MESSAGE_SENT,
        payload: data
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