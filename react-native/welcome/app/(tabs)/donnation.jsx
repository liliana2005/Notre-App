import { Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    ScrollView, } from 'react-native'
import React from 'react'
import { useEffect,useState,useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
const donnation = () => {
const router = useRouter();
 const [fieldBottomY, setFieldBottomY] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [focusedField, setFocusedField] = useState(null);

  const inputRefs = {
    selectedOption: useRef(null),
    description: useRef(null),
    ccp: useRef(null),
    quantity: useRef(null),
    deadline: useRef(null),
    title: useRef(null),
    selectedImage: useRef(null),
  };

    
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
      const shouldAvoidKeyboard = fieldBottomY > screenHeight - keyboardHeight;
    
  return (
    <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
         enabled={shouldAvoidKeyboard}
       >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
             <StatusBar style="dark" />
        {/* Background elements */}
        <View style={styles.background} />
        <Image source={require('@/assets/background.png')} style={styles.rectangle} resizeMode="cover" />
        
        {/* Header */}
        <TouchableOpacity style={styles.backButton}  onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color='#581380' />
        </TouchableOpacity>
           <Text style={styles.donate}>donate</Text>
           <View style={styles.globalcontainer}>
           <TouchableOpacity style={styles.ccpcontainer}>
            <Text style={styles.containertext}>By CCP</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.ccpcontainer}>
            <Text style={styles.containertext}>online</Text>
           </TouchableOpacity>
           </View>
           <View style={styles.containerr}>
      <Text style={styles.label}>Email </Text>
      <Text style={styles.label}>Phone number </Text >
      <Text style={styles.label}>Adresse </Text>
      <Text style={styles.label}>CCP code </Text>
      <Text style={styles.label}>amount </Text>

     
    </View>
          
      <Text style={styles.note}>Donate frome baridi mobe </Text>
      <Text style={styles.note}>/post office</Text>
      <Text style={styles.note}>move directly to organisation localisation</Text>
    <TouchableOpacity style={styles.loginbotton}>
                      <LinearGradient
                           colors={['#CDBDEC', '#7E4ACA', '#4E0976']} // Three color gradient
                         start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                         style={styles.loginbotton}
                       >
                       <Text style={styles.logintext}>donate</Text>
                      </LinearGradient>
     </TouchableOpacity>




    </ScrollView>
     </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  )
}

export default donnation
const styles=StyleSheet.create({
     container: { flex: 1 },
      background: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(181, 161, 218, 1)',
      },
      rectangle: {
        position: 'absolute',
        width: '100%',
        height: Dimensions.get('window').height - -30,
        position: 'absolute',
        top: 60, left: 0,
      },
      backButton: {
        position: 'absolute',
        position: 'absolute',
        top: 88, left: 13,
      },
      donate: {
        position: 'absolute',
        top: 80, left: 130,
        fontSize: 30, color: '#581380',
        fontWeight: 'bold',
      },
      ccpcontainer:{
        backgroundColor: 'white',
        borderColor: '#581380',
        borderWidth: 2,
        borderRadius: 29,
        padding: 15,
        width: '100',
        justifyContent:"center",
        alignContent:"center",
        textAlign:"center",
      
      },
      globalcontainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        top:160,
        textAlign:"center",
        marginHorizontal:49,
       
      },
      containertext:{
        justifyContent:"center",
        alignContent:"center",
        textAlign:"center",
        fontSize: 15, color: '#581380',
        fontWeight: 'bold',
      },
      label: {
        fontWeight: 'bold',
        fontSize: 19,
        marginVertical: 5,
        color: '#F5A623', // Orange for labels
      },
      containerr:{
        padding: 20,
        alignItems: 'flex-start',
        top:200,
      },
      note:{
        color:'#EC1C24',
        top:230,
        textAlign:"center",
      },
      loginbotton:{
      justifyContent:'center',
        borderRadius:20,
        elevation:0,
        width:120,
        height:42,
        textAlign:"center",
        top:140,
        left:60,
       },
       logintext:{
        fontWeight:'500',
        fontSize:18,
       
        color:"white",
        textAlign:"center",
       },

})