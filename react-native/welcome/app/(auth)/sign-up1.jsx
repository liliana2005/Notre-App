import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Dimensions,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = () => {
  const router = useRouter();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [focusedField, setFocusedField] = useState(null);
  const [fieldBottomY, setFieldBottomY] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const inputRefs = {
    fullname: useRef(null),
    email: useRef(null),
    verificationCode: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  // Countdown logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Keyboard visibility tracking
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Measure input Y-position
  const measureField = (field) => {
    inputRefs[field]?.current?.measure((x, y, w, h, px, py) => {
      setFieldBottomY(py + h);
    });
  };

  const screenHeight = Dimensions.get('window').height;
  const shouldAvoidKeyboard = fieldBottomY > (screenHeight - keyboardHeight);

  const handleSendCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email first');
      return;
    }

    setIsSendingCode(true);

    try {
      const response = await fetch('https://your-api.com/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Verification code sent to your email');
        setCountdown(60);
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message || 'Failed to send code');
      }
    } catch {
      Alert.alert('Error', 'Network request failed');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSignUp = async () => {
    if (!fullname || !email || !verificationCode || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://your-api.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, verificationCode, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.token);
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Error', data.message || 'Sign up failed');
      }
    } catch {
      Alert.alert('Error', 'Network request failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={shouldAvoidKeyboard}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <StatusBar style="dark" />
          <Text style={styles.title}>Create an Account</Text>

          {/* Full Name */}
          <Text style={styles.label}>Full name</Text>
          <TextInput
            ref={inputRefs.fullname}
            onFocus={() => {
              setFocusedField('fullname');
              measureField('fullname');
            }}
            onBlur={() => setFocusedField(null)}
            style={styles.input}
            placeholder="Enter your full name"
            value={fullname}
            onChangeText={setFullname}
            autoCapitalize="words"
          />

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            ref={inputRefs.email}
            onFocus={() => {
              setFocusedField('email');
              measureField('email');
            }}
            onBlur={() => setFocusedField(null)}
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Verification Code */}
          <Text style={styles.label}>Verification Code</Text>
          <View style={styles.codecontainer}>
            <TextInput
              ref={inputRefs.verificationCode}
              onFocus={() => {
                setFocusedField('verificationCode');
                measureField('verificationCode');
              }}
              onBlur={() => setFocusedField(null)}
              style={styles.input}
              placeholder="Enter verification code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              onPress={handleSendCode}
              disabled={isSendingCode || countdown > 0}
            >
              <LinearGradient
                colors={['#CDBDEC', '#7E4ACA', '#4E0976']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sendCodeButton}
              >
                {isSendingCode ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.sendCodeText}>
                    {countdown > 0 ? `Resend (${countdown}s)` : 'Send Code'}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            ref={inputRefs.password}
            onFocus={() => {
              setFocusedField('password');
              measureField('password');
            }}
            onBlur={() => setFocusedField(null)}
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            ref={inputRefs.confirmPassword}
            onFocus={() => {
              setFocusedField('confirmPassword');
              measureField('confirmPassword');
            }}
            onBlur={() => setFocusedField(null)}
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {/* Submit */}
          <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
            <LinearGradient
              colors={['#CDBDEC', '#7E4ACA', '#4E0976']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginbotton}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttontext}>Sign up</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#581380',
    marginTop: 90,
  },
  label: {
    fontSize: 17,
    marginBottom: 1,
    color: '#581380',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#581380',
    borderRadius: 23,
    paddingHorizontal: 15,
    marginBottom: 25,
    fontSize: 16,
    flex: 1,
  },
  codecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
    justifyContent: 'space-between',
  },
  sendCodeButton: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    marginLeft: 10,
  },
  sendCodeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  buttontext: {
    fontWeight: '500',
    fontSize: 18,
    marginHorizontal: 10,
    color: 'white',
  },
  loginbotton: {
    flexDirection: 'row',
    borderRadius: 20,
    elevation: 0,
    marginVertical: 30,
    width: '100%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUp;
