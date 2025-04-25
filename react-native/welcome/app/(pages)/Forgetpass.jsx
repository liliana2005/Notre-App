import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ Import Ionicons
import { LinearGradient } from 'expo-linear-gradient'; // Import gradient for the button

const Forgetpass = ({ navigation }) => {
  return (
    <View style={styles.container1}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="purple" />
      </TouchableOpacity>

      {/* Circle with Logo */}
     <View style={styles.logo}>
             <Image source={require('@/assets/logo2.png')} resizeMode="contain" />
             <Text style={[styles.loginText, { fontSize: 24, color: 'purple', fontWeight: 'bold' }]}>Forgot Password</Text>
        
      </View>

      {/* Title */}
      
      <View style={{ height: 20 }} />

      {/* Warning Message */}
      <View style={styles.warningContainer}>
  <Ionicons name="alert-circle" size={40} color="#FFB82B" />
  <View style={styles.warningTextContainer}>
    <Text style={styles.warningText}>Enter your email and we will send you</Text>
    <Text style={styles.warningText}>a link to reset your password</Text>
  </View>
</View>
<View style={{ height: 30 }} />

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>   Email Address</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="black"
            style={styles.input}
          />
        </View>
      </View>
      <View style={{ height: 10 }} /> 

<TouchableOpacity style={styles.signupButton}>

        <LinearGradient
                   colors={['#CDBDEC', '#7E4ACA', '#4E0976']}
                   start={{ x: 0, y: 0 }}
                   end={{ x: 1, y: 0 }}
                   style={styles.signupButton}
                 >
                   <Text style={styles.signupText}>Submit</Text>
                 </LinearGradient>
      </TouchableOpacity>
      <View style={{ height: 75 }} />
      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          <Text style={styles.khText}>.Kh</Text>
          <Text style={styles.dzText}>air DZ.</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    alignSelf: 'center',
    height: 200,
    width: 200,
  
    
    left:10,
   
  },
  
  warningContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 15,
},

warningTextContainer: {
  alignItems: 'center', // Centers text under the icon
},

warningText: {
  color: '#FFB82B',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},

  inputContainer: {
    marginTop: 4,
    width: '100%',
  },
  label: {
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', // Changed to white for better contrast
    borderRadius: 25, // Increased border-radius for rounder edges
    borderWidth: 2, // Added border width
    borderColor: 'purple', // Border color set to purple
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  icon: {
    marginHorizontal: 5,
    color: 'purple', // Changed icon color to purple
  },
 input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  signupButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',  // Matches the input field width
  height: 50,  // Matches the input height
  borderRadius: 20,  // Same as input field
  overflow: 'hidden',  // Ensures gradient is clipped properly
  marginVertical: 15, // Adds spacing
},

signupText: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
  textAlign: 'center',
},

  footerContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    fontFamily: 'AbrilFatface-Regular',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  khText: {
    color: '#FFB82B',
  },
  dzText: {
    color: '#581380',
  },
});

export default Forgetpass;
