import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactList from './ContactList';
import AddContact from './AddContact';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const fName = await AsyncStorage.getItem('firstName');
    setFirstName(fName);
  };

  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <View style={styles.header}>
        <Text style={styles.firstName}>{firstName}</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Contact List" component={ContactList} />
        <Tab.Screen name="Add Contact" component={AddContact} />
      </Tab.Navigator>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#dadada',
    justifyContent: 'center',
  },
  firstName: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
