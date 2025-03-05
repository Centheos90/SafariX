import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';


const MainHeader = ({title}) => {
    const insets = useSafeAreaInsets();
    return(
        <View style={[styles.container,{marginTop:insets.top}]}>
            <Icon 
            onPress={() => {}}
            name="menu"
            size={30}
            />
            <Text style={styles.title}>{title}</Text>
            <Icon
            onPress={() =>{}}
            name="notifications"
            size={30}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:10
    },
    headerRightImage:{
        width:30,
        height:30,
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    }

})

export default MainHeader;