import React from "react"; 
import {  View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';


const FavouriteButton = ({active,style}) => {
    return(
        <View style={[
            {
            backgroundColor:"white",
            padding:4,
            borderRadius:20,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 5 
            },
            style,
            
            ]}>
            <Icon 
            name={active ? "favorite" : "favorite-border"}
            size={24}
            />
        </View>
    )
}

export default FavouriteButton;