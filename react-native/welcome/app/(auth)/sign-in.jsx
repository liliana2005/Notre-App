import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator,TouchableWithoutFeedback,Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_BASE_URL = 'http//192.168.12.177:5001/api';//'http//localhost:8081/api'; // CHANGE THIS

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Auto-login check
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          // Verify token with backend (optional)
          const response = await fetch(`${API_BASE_URL}/auth/validate-token`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            router.replace("/(tabs)/home");
          } else {
            await AsyncStorage.removeItem("authToken");
          }
        }
      } catch (error) {
        console.error("Auto-login error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Information", "Please enter both email and password.");
      return;
    }

    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("authToken", data.token);
        
        router.replace("/(tabs)/home");
      } else {
        Alert.alert("Login Failed", data.message || "Something went wrong. Please try again.");

      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Unable to connect to the server. Please check your network.");
    } 
    
  };

  const handleForgotPassword = () => {
    router.push("forgetpassword");
  };

  const handleSignUp = () => {
    router.push("/(auth)/sign-up1");
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#581380" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'android' ? undefined : 'padding'} // use 'padding' only for iOS
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
    
      <StatusBar style='dark' />
      
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color="purple" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logo}>
        <Image source={require('@/assets/images/logo2.png')} resizeMode="contain" />
      </View>

      <Text style={styles.accounttext}>Login</Text>

     
        {/* Email Input */}
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputContainer}>
          <Fontisto name="email" size={20} color="#581380" style={styles.inputicon} />
          <TextInput
            placeholder="Enter your email"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#581380" style={styles.inputicon} />
          <TextInput
            placeholder="Enter your password"
            style={styles.textInput}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#CDBDEC', '#7E4ACA', '#4E0976']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Social Login Options */}
        <View style={styles.socialLoginContainer}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={30} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={30} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        </View>

    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent:'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    
  },
  logo: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    marginBottom:40,
   
  },
  accounttext: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#581380',
    textAlign: 'center',
   bottom:50,
  },
  label: {
    color: '#581380',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 3,
    marginLeft: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#581380',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
  inputicon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  forgotPassword: {
    color: '#FFB82B',
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginRight: 15,
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#581380',
    fontSize: 16,
  },
  signupLink: {
    color: '#FFB82B',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  socialLoginContainer: {
    marginTop: 40,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D3D3D3',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#581380',
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,

  },
  socialButton: {
    marginBottom:15,
  },
});

export default SignIn;