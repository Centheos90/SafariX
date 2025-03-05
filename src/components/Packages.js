import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FavouriteButton from "./FavouriteButton";

const Packages = ({ list }) => {
    return (
        <View style={styles.container}>
            {list.map((item) => {
                return (
                    <TouchableOpacity key={item.id} style={styles.cardContainer} >
                        <View style={styles.card} >
                            <View style={styles.imageBox}>
                                <Image
                                    style={styles.image}
                                    source={item.image}
                                />
                            </View>
                            <View style={styles.textView}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.title1}>{item.title1}</Text>
                                    <Text style ={styles.title2}>{item.title2}</Text>
                                </View>
                                {/* <FavouriteButton style={styles.textViewButton} /> */}
                        </View>
                    </TouchableOpacity>
                )

            })}
        </View>
    )
}

export default Packages;

const styles = StyleSheet.create({
    cardContainer: {
       margin:25,
       justifyContent:"space-between"
    },
    card: {
        flexDirection:"row",
        alignItems:"center",
        width: "100%",
        height: 120,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.09,
        shadowRadius: 5,
        borderRadius:25,
        
    },
    imageBox: {
        width: 120,
        height: 120,
        overflow: "hidden",
        padding:10,
        borderRadius:25
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius:25
    },
    textView: {
        flex:1,
        flexWrap:"wrap",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    title1: {
        flexWrap:"wrap",
        marginLeft:0,
        marginBottom:5
    },
    textViewButton: {
        top: 175,
        right: 10
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:5,
    },
    title2:{
        marginRight:0
    }


})