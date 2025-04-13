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
  const phonenumber =()=>{
    navigation.navigate("phonenumber")
  };


  return (
  <View style={styles.container}>
        <StatusBar style='dark'/>
        
         
           <TouchableOpacity style={styles.backButton} onPress={phonenumber}>
             <Ionicons name="arrow-back" size={30} color="purple" top="40" />
          </TouchableOpacity>
       
         <View style={styles.logo}>
          <Image source={require('@/assets/images/logo2.png')} resizeMode="contain"/>
         </View>
         <View >
            <Text style={styles.accounttext}> Verify phone number</Text>
          </View>

          <Text style={styles.text}>enter the verification code that we </Text>
          <Text style={styles.text}>sene to +213...</Text>

          <View marginHorizontal={60} flexDirection="row" justifyContent="space-between">
            <Text style={styles.ttext}>not your pone number ?</Text>
            <Text style={styles.change}  >change</Text>
          </View>
          <View flexDirection="row" justifyContent="space-between"  >
          <View style={styles.inputContainer} ><TextInput style={styles.TextInput}/></View>
          <View style={styles.inputContainer} marginLeft="0"><TextInput style={styles.TextInput} placeholder=""/></View>
          <View style={styles.inputContainer}marginLeft="0"><TextInput style={styles.TextInput} placeholder=""/></View>
          <View style={styles.inputContainer} marginLeft="0"><TextInput style={styles.TextInput} placeholder=""/></View>
          <View style={styles.inputContainer}marginLeft="0"><TextInput style={styles.TextInput} placeholder=""/></View>
          </View>
         

              <TouchableOpacity style={styles.loginbotton}>
                 <LinearGradient
                      colors={['#CDBDEC', '#7E4ACA', '#4E0976']} // Three color gradient
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
    fontSize:32,
    color:'#581380',
    fontWeight:'500',
   bottom:43,
  },
  text:{
    color:"#FFB82B",
    textAlign:"center",
    bottom:20,
    fontSize:17,


  },change:{ color:'#FFB82B',fontSize:16,right:10},
  TextInput:{
    padding:4,
    margin:0,
    borderWidth:0,
  },
  inputContainer:{
    flexDirection:"row",
    borderRadius:20,
    marginHorizontal:10,
    elevation:0,
    marginVertical:60,
   backgroundColor:"white",
   borderWidth:1,
   width:60,
   height:55,
   alignItems:"center",
   borderColor:'#581380',
   bottom:17,
  },
  TextInput:{
    padding:9,
    margin:0,
    borderWidth:0,
    fontSize:15,
  },
   
   ttext:{
    color:'#581380',
    fontWeight:'500',
    fontSize:16,
    
    

  },
  
   loginbotton:{
    flexDirection:"row",
    borderRadius:20,
    marginHorizontal:55,
    elevation:0,
    marginVertical:30,
    width:140,
    height:42,
    alignItems:"center",
    bottom:30,
  
   },
   logintext:{
    fontWeight:'500',
    fontSize:18,
    marginHorizontal:44,justifyContent:"center",
    color:"white",
   },
})