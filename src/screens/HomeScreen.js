import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from '../components/MainHeader'
import ScreenHeader from '../components/ScreenHeader'
import { placesList } from '../data'
import Places from '../components/Places'
import SectionHeader from '../components/SectionHeader'
import Packages from '../components/Packages'
const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <MainHeader title="SafariX"/>
      <ScreenHeader mainTitle="Traveler's" secondTitle="Nest"/>  
      <ScrollView showsVerticalScrollIndicator={false}>
        <Places list = {placesList}/>
        <SectionHeader headerTitle="Popular Trips" buttonTitle='See All' onPress={() => {}}/>
        <Packages list = {placesList}/>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{ 
      flex:1,
      backgroundColor:"white"
  }

})