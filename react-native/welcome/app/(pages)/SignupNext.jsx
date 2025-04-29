import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const API_BASE_URL = 'http://localhost:5001/api';

const SignupNext = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
    phone: "",
    driveLink: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatename = (name) => {
    const re = /^[a-zA-Z\s]+$/; // Only allows alphabets and spaces
    return re.test(name);
  };
  const validateEmail = useCallback((email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }, []);

  const validatephone = useCallback((phone) => {
    const re = /^[0-9]+$/;
    return re.test(phone) && phone.length === 10;
  }, []);

  const validateDriveLink = useCallback((link) => {
    // Basic validation for Google Drive link
    const re = /^(https?:\/\/)?(www\.)?drive\.google\.com\/.+/i;
    return re.test(link);
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const { name , email, verificationCode, password, confirmPassword, phone, driveLink } = formData;
    if (!name) {
      newErrors.name = "name is required";
    } else if (!validatename(name)) {
      newErrors.name = "Invalid name format";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!verificationCode) {
      newErrors.verificationCode = "Verification code is required";
    } else if (verificationCode.length < 6) {
      newErrors.verificationCode = "Code must be 6 digits";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatephone(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!driveLink) {
      newErrors.driveLink = "Documentation link is required";
    } else if (!validateDriveLink(driveLink)) {
      newErrors.driveLink = "Please enter a valid Google Drive link";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateEmail, validatephone, validateDriveLink]);
// button rej3ih send 
// dirih yahseb 60 s 
  const handleResendCode = useCallback(async () => {
    if (!formData.name) {
      Alert.alert("Error", "Please enter your name first");
      return;
       }
    if (!formData.email) {
      Alert.alert("Error", "Please enter your email first");
      return;
    }
    if (!validateEmail(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    
    setIsResendDisabled(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/orgAuth/send-verification-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email , name : formData.name}),
      });

        if (response.ok) {
              Alert.alert('Success', 'Verification code sent to your email');
              
            } else {
              const data = await response.json();
              Alert.alert('Error', data.message || 'Failed to send code');
            }
          } catch {
            Alert.alert('Error', 'Network request failed');
          } finally {
            setTimeout(() => setIsResendDisabled(false), 30000);
          }
  
  }, [formData.email, validateEmail]);

  const handleInputChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (name === 'password' && errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: null }));
    }
  }, [errors]);

  const handleNext = useCallback(async () => {
    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/orgAuth/complete-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name : formData.name,
          email: formData.email,
          code: formData.verificationCode,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone,
          driveLink: formData.driveLink,

        }),
      });
  
      /*if (!verifyResponse.ok) {
        throw new Error('Invalid verification code');
      }*/
      // rah ndir modificartion hna w rah nahi navigation w nremplaciha b router
      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.token);
        router.replace('/(pages)/Home2');
      } else {
        Alert.alert('Error', data.message || 'Sign up failed');
      }
    } catch {
      Alert.alert('Error', 'Network request failed');
    } finally {
      setIsSubmitting(false);
    }
    
  
  
  }, [validateForm, router , formData]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container1}>
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="purple" />
            </TouchableOpacity>

            <Text style={styles.accounttext}>Create An Account</Text>
              
            <View style={styles.formContainer}>
              {/* Name Input */}

            <Text style={styles.label}>organization name</Text>
              <View style={[
                styles.inputContainer,
                errors.name && { borderColor: 'red' }
              ]}>
                {/*<Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color={errors.name ? 'red' : 'purple'} 
                   
                />*/}
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  keyboardType="words"
                  autoCapitalize="none"
                  autoComplete="name"
                  
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              {/* Email Input */}
              <Text style={styles.label}>Email Address</Text>
              <View style={[
                styles.inputContainer,
                errors.email && { borderColor: 'red' }
              ]}>
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color={errors.email ? 'red' : 'purple'} 
                  style={styles.icon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              {/* Verification Code + Resend Button */}
              <Text style={styles.label}>Verification Code</Text>
              <View style={styles.verificationContainer}>
                <TextInput
                  style={[
                    styles.input, 
                    styles.verificationInput,
                    errors.verificationCode && { borderColor: 'red' }
                  ]}
                  placeholder="Enter 6-digit code"
                  keyboardType="numeric"
                  value={formData.verificationCode}
                  onChangeText={(text) => handleInputChange('verificationCode', text)}
                  maxLength={6}
                />
                <TouchableOpacity onPress={handleResendCode} disabled={isResendDisabled}>
                  <LinearGradient
                    colors={isResendDisabled ? ['#CCCCCC', '#999999'] : ['#CDBDEC', '#7E4ACA', '#4E0976']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.resendButton}
                  >
                    <Text style={styles.resendText}>
                      {isResendDisabled ? 'Resending...' : 'Resend'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              {errors.verificationCode && <Text style={styles.errorText}>{errors.verificationCode}</Text>}

              {/* Password Input */}
              <Text style={styles.label}>Password</Text>
              <View style={[
                styles.inputContainer,
                errors.password && { borderColor: 'red' }
              ]}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color={errors.password ? 'red' : 'purple'} 
                  style={styles.icon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password "
                  secureTextEntry={!passwordVisible}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  autoComplete="password"
                  textContentType="newPassword"
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Ionicons 
                    name={passwordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={errors.password ? 'red' : 'gray'} 
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              {/* Confirm Password Input */}
              <Text style={styles.label}>Confirm Password</Text>
              <View style={[
                styles.inputContainer,
                errors.confirmPassword && { borderColor: 'red' }
              ]}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color={errors.confirmPassword ? 'red' : 'purple'} 
                  style={styles.icon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  secureTextEntry={!confirmPasswordVisible}
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleInputChange('confirmPassword', text)}
                  autoComplete="password"
                  textContentType="newPassword"
                />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  <Ionicons 
                    name={confirmPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={errors.confirmPassword ? 'red' : 'gray'} 
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

              {/* Phone Number Input */}
              <Text style={styles.label}>Phone Number</Text>
              <View style={[
                styles.inputContainer,
                errors.phone && { borderColor: 'red' }
              ]}>
                <Ionicons 
                  name="call-outline" 
                  size={20} 
                  color={errors.phone ? 'red' : 'purple'} 
                  style={styles.icon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your 10-digit phone number"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange('phone', text)}
                  maxLength={10}
                  autoComplete="tel"
                  textContentType="telephone"
                />
              </View>
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

              {/* Documentation Link Input */}
              <Text style={styles.label}>Documentation Link</Text>
              <View style={[
                styles.inputContainer,
                errors.driveLink && { borderColor: 'red' }
              ]}>
                <Ionicons 
                  name="document-text-outline" 
                  size={20} 
                  color={errors.driveLink ? 'red' : 'purple'} 
                  style={styles.icon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Google Drive link "
                  value={formData.driveLink}
                  onChangeText={(text) => handleInputChange('driveLink', text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.driveLink && <Text style={styles.errorText}>{errors.driveLink}</Text>}

              {/* Next Button */}
              <TouchableOpacity 
                onPress={handleNext} 
                disabled={isSubmitting}
                style={styles.signupButtonContainer}
              >
                <LinearGradient
                  colors={['#CDBDEC', '#7E4ACA', '#4E0976']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.signupButton}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.signupText}>Sign Up</Text>
                  )}
                </LinearGradient>
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  accounttext: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#581380',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
    color: 'purple',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'purple',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
  },
  verificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  verificationInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  resendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  signupButtonContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 200,
  },
  signupButton: {
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 15,
    marginBottom: 10,
  },
  footerContainer: {
    marginTop: 20,
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

export default SignupNext;