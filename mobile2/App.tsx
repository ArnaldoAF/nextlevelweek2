import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './src/pages/Landing';


import {AppLoading} from 'expo';
import { useFonts, Archivo_400Regular, Archivo_700Bold} from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_300Light } from '@expo-google-fonts/poppins';
import AppStack from './src/routes/AppStack';

export default  function App() {
  let [fontsLoaded, error] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light
  });

  if(!fontsLoaded) {
    console.log("!fontsLoaded");
    return <AppLoading />;
  }
  else {
    console.log("fontsLoaded");
  return (
    <>
      <AppStack />
      <StatusBar style="light" /> 
    </>

  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#FFF',
    fontSize: 32
  }
});
