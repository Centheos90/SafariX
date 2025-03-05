import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const ContactList = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>ChatList</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('chat');
        }}>
        <Text>Go to chat page</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('login');
        }}>
        <View style={styles.logoutBtn}>
          <Text style={styles.logoutText}>LogOut</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    height: 30,
    width: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
  },
});
