import React, { Component,useEffect,useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
    RefreshControl
} from 'react-native';
// import ws, { WS_URL } from '../socket';
import { WS_URL,ws } from './MyWebSocket';
import { sendMsg, recieveMsg,getSpaces,getSocket } from '../actions';
import { connect } from 'react-redux';
import SpacesList from './SpacesList'

const Home = (props) => {

    const [refreshing,setRefreshing] = useState(false)
    const [connected,setConnected] = useState(false)


    const key = [{name:1},{name:2},{name:3},]

    const _sendMsg = (msg) =>  {
        props.sendMsg(JSON.stringify(msg));
    }


    useEffect(() =>{
        // get socket
        props.getSocket()
        if(props.socket.socket.url == null) console.log('no socket url')
        else
        {
            const WS_URL = props.socket.socket.url;
            const ws = new WebSocket(WS_URL);

            ws.onerror = (e) => {
                console.log("ws error", e);
            }

            ws.onopen = (e) => {
                console.log("ws open", e);
            }

            ws.onclose = (e) => {
                console.log("ws close", e);
            }
            // get spaces
            props.getSpaces()

            ws.addEventListener('open', event => {
                console.log("ws message received", event.data);
                setConnected(true)
                props.recieveMsg(event.data);
            });

            ws.addEventListener('message', event => {
                console.log("ws message received", event.data);
                props.recieveMsg(event.data);
            });

            ws.close();
        }
    },[props.socket.socket.ttl])

    const _onRefresh = () => {
        setRefreshing(true)
        // get updated refresh values
        props.getSpaces()
        setRefreshing(false)

        props.getSpaces()
    }


       // const msg = this.state.input;
        const { receivedMsg } = props.socket;
        console.log("receivedMsg render", receivedMsg);

        return (
            <View style={styles.container}>
                <FlatList
                style={{marginTop:30}}
                data={props.socket.spaces.results}
                //keyExtractor={this.key.name}
                renderItem={({item}) => <SpacesList spaces={item}/>}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
                  }
                />
                {/* <Text style={styles.header}>{props.socket.socket.url}</Text> */}

            </View>
        );
    
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#512DA8',
    },
    received: {
        marginTop: 40,
        fontSize: 24,
        color: 'white',
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20
    },
    header: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'stretch',
        marginTop:20,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: '800'
    },
});