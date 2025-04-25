import React, { useRef, useState } from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MaterialIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const forgetpassword = () => {
  const navigation = useNavigation();
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const phonenumber = () => {
    navigation.navigate("forgetpassword")
  };

  const handleChangeText = (text, index) => {
    // Only allow numbers
    const newText = text.replace(/[^0-9]/g, '');
    
    // Update the codes array
    const newCodes = [...codes];
    newCodes[index] = newText;
    setCodes(newCodes);

    // Auto focus next input if there's a value
    if (newText && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto focus previous input if backspace pressed and current is empty
    if (text === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      
      <TouchableOpacity style={styles.backButton} onPress={phonenumber}>
        <Ionicons name="arrow-back" size={30} color="purple" top="40" />
      </TouchableOpacity>
    
      <View style={styles.logo}>
        <Image source={require('@/assets/images/logo2.png')} resizeMode="contain"/>
      </View>
      <View>
        <Text style={styles.accounttext}> </Text>
      </View>

      <Text style={styles.text}>enter the verification code that has been</Text>
      <Text style={styles.text}>sent to your email</Text>

      <View flexDirection="row" justifyContent="space-between">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.TextInput}
              keyboardType="numeric"
              maxLength={1}
              value={codes[index]}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && codes[index] === '' && index > 0) {
                  inputRefs.current[index - 1].focus();
                }
              }}
              textAlign="center"
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.loginbotton}>
        <LinearGradient
          colors={['#CDBDEC', '#7E4ACA', '#4E0976']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.loginbotton}
        >
          <Text style={styles.logintext}>Verify</Text>
        </LinearGradient>
      </TouchableOpacity>
      
      <View marginHorizontal={60} flexDirection="row" justifyContent="space-between">
        <Text style={styles.ttext}>Didn't receive the code ?</Text>
        <Text style={styles.change}>Resend</Text>
      </View>
    </View>
  )
}

export default forgetpassword

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  logo: {
    height: 222,
    width: 255,
    top: 50,
    left: 93,
    marginBottom: 40
  }, 
  accounttext: {
    textAlign: 'center',
    fontSize: 32,
    color: '#581380',
    fontWeight: '500',
    bottom: 43,
  },
  text: {
    color: "#FFB82B",
    textAlign: "center",
    bottom: 20,
    fontSize: 17,
  },
  change: { 
    color: '#FFB82B',
    fontSize: 16,
    right: 10
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 20,
    elevation: 0,
    marginVertical: 60,
    backgroundColor: "white",
    borderWidth: 1,
    width: 60,
    height: 55,
    alignItems: "center",
    borderColor: '#581380',
    bottom: 17,
  },
  TextInput: {
    padding: 9,
    margin: 0,
    borderWidth: 0,
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
  },
  ttext: {
    color: '#581380',
    fontWeight: '500',
    fontSize: 16,
  },
  loginbotton: {
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 55,
    elevation: 0,
    marginVertical: 30,
    width: 140,
    height: 42,
    alignItems: "center",
    bottom: 30,
  },
  logintext: {
    fontWeight: '500',
    fontSize: 18,
    marginHorizontal: 44,
    justifyContent: "center",
    color: "white",
  },
})