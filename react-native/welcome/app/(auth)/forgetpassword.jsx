import React from 'react'
import { StyleSheet,Image,View, Text,TouchableOpacity ,TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import { MaterialIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const forgetpassword = () => {
   const navigation =useNavigation();
  const handle =()=>{
    navigation.navigate("sign-in")
  };


  return (
  <View style={styles.container}>
        <StatusBar style='dark'/>
        
         
           <TouchableOpacity style={styles.backButton} onPress={handle}>
             <Ionicons name="arrow-back" size={30} color="purple" top="40" />
          </TouchableOpacity>
       
         <View style={styles.logo}>
          <Image source={require('@/assets/images/logo2.png')} resizeMode="contain"/>
         </View>
         <View >
            <Text style={styles.accounttext}> Forget Password </Text>
          </View>
         
          <MaterialIcons name="error-outline" size={30} color='#FFB82B' bottom="10" left="160" />

          <Text style={styles.text}>enter your email and we will send you a</Text>
          <Text style={styles.text}>link to reset your password</Text>

          <View><Text style={styles.ttext}>Email Address</Text></View>
          <View style={styles.inputContainer}>
              <Fontisto name={"email"} size={20}color={'#581380'} style={styles.inputicon} />
              <TextInput style={styles.TextInput} placeholder="enter your email"/>
           </View>
           <TouchableOpacity style={styles.loginbotton}>
                 <LinearGradient
                      colors={['#CDBDEC', '#7E4ACA', '#4E0976']} // Three color gradient
                    start={{ x: 0, y: 0 }}
                     end={{ x: 1, y: 0 }}
                    style={styles.loginbotton}
                  >
                  <Text style={styles.logintext}>Submit</Text>
                 </LinearGradient>
                 </TouchableOpacity>

         
  </View>
  )
}

export default forgetpassword
const styles=StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
  },
  logo:{
    height:222,
    width:255,
    top:50,
    left:93,
    marginBottom:40
  }, 
  accounttext:{
    textAlign:'center',
    fontSize:35,
    color:'#581380',
    fontWeight:'500',
   bottom:43,
  },
  text:{
    color:"#FFB82B",
    textAlign:"center",
   
    fontSize:16,


  },
  TextInput:{
    padding:4,
    margin:0,
    borderWidth:0,
    flex:1,
    fontSize:16,
  },
  inputContainer:{
    flexDirection:"row",
    borderRadius:20,
    marginHorizontal:10,
    elevation:0,
    marginVertical:60,
   backgroundColor:"white",
   borderWidth:1,
   width:340,
   height:43,
   alignItems:"center",
   borderColor:'#581380',
   bottom:17,
  },
   
  
   
   ttext:{
    color:'#581380',
    fontWeight:'500',
    fontSize:16,
    marginHorizontal:10,
    top:40,

  },
  inputicon:{
    marginLeft:10,
   marginRight:10,
   },
   loginbotton:{
    flexDirection:"row",
    borderRadius:20,
    marginHorizontal:5,
    elevation:0,
    marginVertical:30,
    width:340,
    height:42,
    alignItems:"center",
    bottom:40,
  
   },
   logintext:{
    fontWeight:'500',
    fontSize:18,
    marginHorizontal:10,
    color:"white",
    left:130,
   },
})