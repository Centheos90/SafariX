import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FavouriteButton from "./FavouriteButton";
const Places = ({list}) => {
    return (
        <FlatList 
        data={list}
        horizontal
        snapToInterval={300+ 25}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item,index})=>{
            return(
                <TouchableOpacity style={{marginLeft:25, marginRight: index === list.length - 1 ? 25 : 0}}> 
                    <View style={styles.card}>
                        <FavouriteButton style={styles.favorite}/>
                        <View style={styles.imageBox}>
                            <Image 
                            source={item.image}
                            style={styles.image}
                            />
                        </View>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }}
        />
    )
}

export default Places;

const styles = StyleSheet.create({
    card:{
        width:300,
        height:200, 
        marginVertical:10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 3 
    },
    imageBox:{
        width:300,
        height:200,
        overflow:"hidden",
        borderRadius:20,
        
    },
    image:{
        width:"100%" ,
        height:"100%",
        resizeMode:"cover",
    },
    titleBox:{
        position:"absolute",
        top:120,
        left:20
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        color:"white"
    },
    favorite:{
        position:"absolute",
        top:20,
        right:20 ,
        zIndex:1
    }
})