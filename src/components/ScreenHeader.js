import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ScreenHeader = ({mainTitle,secondTitle}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>
                {mainTitle}
            </Text>
            <Text style={styles.secondTitle}>
                {secondTitle}
            </Text>
        </View>
    )
}

export default ScreenHeader;

const styles = StyleSheet.create({

    container:{
        paddingHorizontal:25 ,
        paddingVertical:25
    },
    mainTitle:{
        fontSize:35,
        fontWeight:"bold"
    },
    secondTitle:{
        fontSize:35, 
     }

})