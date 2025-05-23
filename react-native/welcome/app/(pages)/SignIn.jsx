import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Keyboard,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router';
const API_BASE_URL = 'http://192.168.150.138:5001/api'; // CHANGE THIS TO YOUR ACTUAL API URL

const Sign = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("orgauthToken");
        if (token) {
          // Verify token with backend (optional)
          const response = await fetch(`${API_BASE_URL}/orgAuth/validate-token`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            router.replace("/(pages)/Home2");
          } else {
            await AsyncStorage.removeItem("orgauthToken");
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
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    
    
    try {
      const response = await fetch(`${API_BASE_URL}/orgAuth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("orgauthToken", data.token);
        router.replace("/(pages)/Home2");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");

      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Unable to connect to the server. Please check your network.");
    } 
  };
  

  const SignUp = () => {
    router.push("/(pages)/SignupNext");
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#581380" />
      </View>
    );
  }
  const ForgotPassword = () => {
    router.push("/(pages)/Home2");
  };
  return (
     <View style={styles.container1}>
          {/* Back Arrow */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} color="purple" />
          </TouchableOpacity>

          {/* Circle with Logo */}
          <View style={styles.logo}>
        <Image source={require('@/assets/logo2.png')} resizeMode="contain" />
        <Text style={styles.accounttext}>Login</Text>
      
      </View>
     
      <View style={{ height: 50 }} />

          
          

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>       Email Address</Text>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={20} style={styles.icon} />
              
              <TextInput
  placeholder="Enter your email"
  style={styles.input}
  value={email}
  onChangeText={setEmail}
  autoCapitalize="none"
  keyboardType="email-address"
  autoComplete="email" // This enables email suggestions
  
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>       Password</Text>
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
              <TextInput
                placeholder="Enter your password"
               
                style={styles.input}
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Ionicons
                  name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 20 }} />
          {/* Forget Password */}
          <TouchableOpacity 
            style={styles.forgetPasswordContainer} 
            onPress={ForgotPassword}
          >
            <Text style={styles.forgetPassword}>Forget Password?</Text>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
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
              style={styles.gradientButton}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={[styles.buttonText, { color: 'white', fontSize: 15, fontWeight: 'bold' }]}>
                  Login
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ height: 10 }} />
          {/* Sign Up Text */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={SignUp}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Text */}
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
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 1,
    
    left:10,
   
  },
  accounttext: {
   fontSize: 28,
    fontWeight: 'bold',
    color: '#581380',
    textAlign: 'center',
    right:10,
  
     
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
   marginTop:0,
    width: '100%',
  },
  label: {
    color: '#581380',
    fontSize: 16,
    fontWeight: '500',
    
    
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor:'#581380',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 12,
    marginBottom:10,
  },
  icon: {
    marginHorizontal: 5,
    color: '#581380',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  forgetPasswordContainer: {
    alignSelf: 'flex-end',
    marginRight: 32,
    marginTop: 20,
  },
  forgetPassword: {
    color: '#FFB82B',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    width: '90%',
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
    
  },
  gradientButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signupContainer: {
  flexDirection: 'row',
  justifyContent: 'center', // Add this to center horizontally
  width: '100%', // Make it take full width
  marginTop: 15,
},
  signupText: {
    color:'black',
    fontSize: 14,
    textAlign: 'center',
   
  },
  signupLink: {
    color: '#FFB82B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  bottomSection: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
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

export default Sign;