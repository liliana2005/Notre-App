import { View, Text,StyleSheet,TextInput ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const Personalinfo = () => {

  return (

    <View style={styles.container}>
     <Image style={styles.bg} source={require('@/assets/images/perinfobg.png')}/>
     <Text style={styles.accounttext}> Change password  </Text>

    <View><Text style={styles.accounttext2}>Old Password</Text></View>
    <View style={styles.inputContainer}>
                <Ionicons name={"lock-closed-outline"} size={20}color={'#581380'} style={styles.inputicon} />
                <TextInput style={styles.TextInput} placeholder="enter your password" secureTextEntry={true}/>
             </View>
             <View><Text style={styles.accounttext2}> New Password</Text></View>
    <View style={styles.inputContainer}>
                <Ionicons name={"lock-closed-outline"} size={20}color={'#581380'} style={styles.inputicon} />
                <TextInput style={styles.TextInput} placeholder="enter your password" secureTextEntry={true}/>
             </View>
             <View><Text style={styles.accounttext2}> Confirm Password</Text></View>
    <View style={styles.inputContainer}>
                <Ionicons name={"lock-closed-outline"} size={20}color={'#581380'} style={styles.inputicon} />
                <TextInput style={styles.TextInput} placeholder="enter your password" secureTextEntry={true}/>
             </View>
     <TouchableOpacity style={styles.loginbotton}>
                      <LinearGradient
                           colors={['#CDBDEC', '#7E4ACA', '#4E0976']} // Three color gradient
                         start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                         style={styles.loginbotton}
                       >
                       <Text style={styles.logintext}>Edit</Text>
                      </LinearGradient>
     </TouchableOpacity>

    </View>
  )
}

export default Personalinfo
const styles=StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
    padding:5,
   alignItems:'center',
  },
  bg:{
   
    resizeMode:'contain',
    width:375,
    height:65,
    marginBottom:100,
    marginTop:-6,

  },
  inputicon:{
    marginLeft:10,
   marginRight:10,
   },
  accounttext:{
    textAlign:'center',
    fontSize:30,
    color:'#581380',
    fontWeight:'500',
   bottom:58,
  },
  addphoto:{
    justifyContent:'center',
    width:83,
    height:81,
    bottom:20,

  },
  accounttext2:{
    fontSize:18,
    color:'#581380',
    marginHorizontal:10,marginLeft:-170,
    top:32
    
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:20,
    marginHorizontal:10,
   backgroundColor:"white",
   borderWidth:1,
   width:335,
   height:43,
   alignItems:"center",
   borderColor:'#581380',
     top:30,
   marginBottom:10,
   },
   TextInput:{
    flex: 1,
    fontSize: 16,
    
   },
   phonephoto:{
   width:129,
   height:40.5,
   marginRight:12,

   },
  
   
   loginbotton:{
    flexDirection:"row",
    borderRadius:20,
    elevation:0,
    marginVertical:30,
    width:130,
    height:42,
    alignItems:"center",
    top:30,
  
   },
   logintext:{
    fontWeight:'500',
    fontSize:18,
   left:45,
    color:"white",
   },
})