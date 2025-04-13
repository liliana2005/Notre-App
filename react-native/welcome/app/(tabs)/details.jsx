import { View, Text,StyleSheet,TextInput ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import Profile from './profile'

const Personalinfo = () => {
  
  return (

    <View style={styles.container}>
     
     <Image style={styles.bg} source={require('@/assets/images/perinfobg.png')}/>
   
     <Text style={styles.accounttext}> Details  </Text>
     <Image style={styles.detailphoto} source={require('@/assets/images/detailphoto.png')} />
    

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
  accounttext:{
    textAlign:'center',
    fontSize:30,
    color:'#581380',
    fontWeight:'500',
   bottom:98,
  },
  detailphoto:{
    resizeMode:'contain',
   height:600,
    width:350,
    bottom:90,
  },
  
})