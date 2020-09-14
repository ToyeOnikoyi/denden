import React from 'react'
import { ScrollView,View,TouchableOpacity,Text,StyleSheet } from 'react-native'



const SpacesList = (props) => {
    
    return(
        <ScrollView>
            <TouchableOpacity style={styles.viewStyle}>
                <Text style={styles.textStyle}>{props.spaces.name}</Text>
                <Text style={styles.textCountStyle}> {props.spaces.current_count}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textStyle:{
        //flex:1,
        fontSize:18,
        color:"white",
    },
    textCountStyle:{
        //flex:1,
        fontSize:18,
        color:"white",
        justifyContent:'space-between',
    },
    viewStyle:{
        flex:1,
        flexDirection:"row",
        borderRadius:20,
        borderColor:'white',
        borderWidth:2,
        margin:20,
        padding:20,
    }
})

export default SpacesList