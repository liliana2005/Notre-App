import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import logo from "@/assets/images/logo.png"
const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
   
       
    
      {/* Logo */}
      <Image source={logo}
            resizeMode='cover'
            style={styles.logo}
        ></Image>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.appName1}>Kh</Text>
      <Text style={styles.appName2}>air DZ</Text>

      {/* User Type Text */}
      <Text style={styles.areYouText}>ARE YOU :</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Donor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Organisation</Text>
        </TouchableOpacity>
      </View>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 255,
    height: 222,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '400',
  },
  appName1: {
    fontSize: 30,
    color: 'rgba(223, 178, 28, 0)', // Same color as "Khair DZ" in the image
    fontWeight: 'bold',
  },
  appName2:{
    fontSize: 30,
    color: 'rgba(96, 8, 137, 0.5)', // Same color as "Khair DZ" in the image
    fontWeight: 'bold',
  },
  areYouText: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: '400',
    color: 'rgba(96, 8, 137, 0.5)',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    backgroundColor: 'rgba(96, 8, 137, 0.5)', // Purple color for the buttons
    paddingVertical: 15,
    height:156,
    width:408,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  buttonText: {
    color:'rgba(223, 178, 28, 0)' , // Gold color for the text
    fontSize: 18,
    fontWeight: '600',
    textAlign:'center'
  },
});

export default WelcomeScreen;