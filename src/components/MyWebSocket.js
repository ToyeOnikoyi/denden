import React, { Component,useEffect } from 'react';
import { View } from 'react-native';
//import ws from '../socket';
import { connect } from 'react-redux';
import { sendMsg, recieveMsg,getSpaces,getSocket } from '../actions';



export const WS_URL = "wss://sockets.density.io:8443/v2/?code=skc_fQhnu2a";
export const ws = new WebSocket(WS_URL);

const MyWebSocket = (props) => {
    useEffect(() => {
        props.getSocket()
        // App in foreground, start the connection
        ws.onerror = (e) => {
            console.log("ws error", e);
        }

        ws.onclose = (e) => {
            console.log("ws close", e);
        }
        return ws.close();
    },[])

        return <View style={{ flex: 0 }}></View>
}


const mapStateToProps = state => {
    console.log("mapStateToProps", state);
    return {
        socket: state.socket
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendMsg: data => {
            dispatch(sendMsg(data));
        },
        recieveMsg: data => {
            dispatch(recieveMsg(data));
        },
        getSpaces: data => {
            dispatch(getSpaces(data))
        },
        getSocket: data => {
            dispatch(getSocket(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWebSocket);

