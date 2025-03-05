import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IMAGES from "../assets/images/temp1"; 
const Tab = createBottomTabNavigator(); 

const TabNavigator = () => {
    return(
        <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
            headerShown:false,
            tabBarShowLabel:false
        }}
        >
            <Tab.Screen  
            name="Home" 
            component={HomeScreen}
            options={{
                title:" ",
                headerStyle:{
                    backgroundColor:"white"
                },
                headerLeft:() => (
                    <View style={styles.logoView}>
                        <Image 
                        source={IMAGES.LOGO}
                        style={styles.logoImage}
                        /> 
                         <Text style={styles.logoText}>SafariX</Text>                     
                    </View>
                ),
                headerRight:() => (
                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image
                            source={IMAGES.DRAWER}
                            style={styles.headerRightImage}
                            />
                        </TouchableOpacity>
                    </View>
                ),

                headerShown:false,
                tabBarIcon: () => (
                    <Image 
                    source={IMAGES.HOME} 
                    resizeMode="cover" 
                    style={styles.button}
                    />
                )
            }}
            />
            <Tab.Screen  
            name="Search" 
            component={SearchScreen}
            options={{
                tabBarIcon: () => (
                    <Image 
                    source={IMAGES.SEARCH} 
                    resizeMode="cover" 
                    style={[styles.button ,{height:35}]}
                    />
                )
            }}
            />
            <Tab.Screen
            name="Favourite" 
            component={FavouriteScreen}
            options={{
                tabBarIcon: () => (
                    <Image 
                    source={IMAGES.FAV} 
                    resizeMode="cover" 
                    style={styles.button}
                    />
                )
            }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator;

const styles = StyleSheet.create({
    button:{
        width:"100%",
        height:"100%",
    },
    logoView:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row"
    },
    logoImage:{
        width:70,
        height:70,
        marginLeft:5,
        marginBottom:10,
    
    },
    logoText:{
        fontSize:20,
        fontWeight:"bold",
    },
    headerRight:{
        alignItems:"center",
        justifyContent:"center"
    },
    headerRightImage:{
        width:30,
        height:30,
        marginRight:10
    }
    
})