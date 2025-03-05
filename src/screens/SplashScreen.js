import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('token')
        .then(token => {
          if (token) {
            navigation.navigate('home');
          } else {
            navigation.navigate('login');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Splash</Text>
      </View>
      <Text>Initial Screen</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    backgroundColor: 'royalblue',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
