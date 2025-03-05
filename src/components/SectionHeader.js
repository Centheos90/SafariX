import React from "react";
import { Button, StyleSheet, Text,View } from "react-native";

const SectionHeader = ({headerTitle,onPress ,buttonTitle ='Button'}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.textTitle}>{headerTitle}</Text>
            <Button title={buttonTitle}/>
        </View>

    )

}

export default SectionHeader;

const styles = StyleSheet.create({
    container:{
        marginHorizontal:25,
        marginTop:25,
        marginBottom:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    textTitle:{
        fontSize:18,
        fontWeight:"bold"
    }


})