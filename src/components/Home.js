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
import ws, { WS_URL } from '../socket';
import { sendMsg, recieveMsg,getSpaces } from '../actions';
import { connect } from 'react-redux';
import SpacesList from './SpacesList'

const Home = (props) => {

    // state = {
    //     //input: '',
    //     refreshing: false,
    // }
    const [refreshing,setRefreshing] = useState(false)


    const key = [{name:1},{name:2},{name:3},]

    // constructor(props) {
    //     super(props);
    //     console.log("Home", props);
    // }

    const _sendMsg = (msg) =>  {
        props.sendMsg(JSON.stringify(msg));
    }

    // _changeText(text) {
    //     this.setState({ input: text });
    // }

    // componentDidMount() {
    //     // Component specific event listeners
    //     this.props.getSpaces()

    //     ws.addEventListener('open', event => {
    //         console.log("ws message received", event.data);
    //         this.props.recieveMsg(event.data);
    //     });

    //     ws.addEventListener('message', event => {
    //         console.log("ws message received", event.data);
    //         this.props.recieveMsg(event.data);
    //     });
    // }

    useEffect(() =>{
        // get spaces
        props.getSpaces()

        ws.addEventListener('open', event => {
            console.log("ws message received", event.data);
            props.recieveMsg(event.data);
        });

        ws.addEventListener('message', event => {
            console.log("ws message received", event.data);
            props.recieveMsg(event.data);
        });
    },[])

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
    button: {
        fontSize: 20,
        borderRadius: 50,
        color: 'white',
        fontWeight: '800'
    },
    buttonContainer: {
        backgroundColor: '#8BC34A',
        borderRadius: 8,
        padding: 16,
        marginTop: 16
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
    editText: {
        height: 40,
        backgroundColor: '#f5f5f5',
        color: 'black',
        fontSize: 18,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 8,
        height: 60,
    }
});