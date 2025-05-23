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

const API_BASE_URL = 'http://192.168.150.138:5001/api'; // UPDATE to your server IP

const SignUpN = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [documentationLink, setDocumentationLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [focusedField, setFocusedField] = useState(null);
  const [fieldBottomY, setFieldBottomY] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    code: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    phone: useRef(null),
    documentationLink: useRef(null),
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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

  const measureField = (field) => {
    inputRefs[field]?.current?.measure((x, y, w, h, px, py) => {
      setFieldBottomY(py + h);
    });
  };

  const screenHeight = Dimensions.get('window').height;
  const shouldAvoidKeyboard = fieldBottomY > (screenHeight - keyboardHeight);

  const handleSendCode = async () => {
    if (!email || !name) {
      Alert.alert('Error', 'Please enter your name and email first');
      return;
    }

    setIsSendingCode(true);

    try {
      const response = await fetch(`${API_BASE_URL}/orgAuth/send-verification-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Verification code sent to your email');
        setCountdown(60);
      } else {
        
        Alert.alert('Error', data.message || 'Failed to send code');
      }
    } catch {
      Alert.alert('Error', 'Network request failed');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !code || !password || !confirmPassword || !phone || !documentationLink) {
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
      const response = await fetch(`${API_BASE_URL}/orgAuth/complete-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          code,
          password,
          confirmPassword,
          phone,
          documentationLink,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('orgauthToken', data.token);
        router.replace("/(pages)/Home2");
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

          <Text style={styles.label}> name</Text>
          <TextInput
            ref={inputRefs.name}
            onFocus={() => {
              setFocusedField('name');
              measureField('name');
            }}
            onBlur={() => setFocusedField(null)}
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

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

          <Text style={styles.label}>Verification Code</Text>
          <View style={styles.codecontainer}>
            <TextInput
              ref={inputRefs.code}
              onFocus={() => {
                setFocusedField('code');
                measureField('code');
              }}
              onBlur={() => setFocusedField(null)}
              style={styles.input}
              placeholder="Enter verification code"
              value={code}
              onChangeText={setCode}
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

          <Text style={styles.label}>Phone</Text>
          <TextInput
            ref={inputRefs.phone}
            onFocus={() => {
              setFocusedField('phone');
              measureField('phone');
            }}
            onBlur={() => setFocusedField(null)}
            style={styles.input}
            placeholder="Enter phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Drive Link</Text>
          <TextInput
            ref={inputRefs.documentationLink}
            onFocus={() => {
              setFocusedField('documentationLink');
              measureField('documentationLink');
            }}
            onBlur={() => setFocusedField(null)}
            style={styles.input}
            placeholder="Enter your Drive link"
            value={documentationLink}
            onChangeText={setDocumentationLink}
            autoCapitalize="none"
          />

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

// Styles remain unchanged
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
    fontSize: 16,
   fontWeight:500,
    color: '#581380',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#581380',
    borderRadius: 23,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
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

export default SignUpN;
