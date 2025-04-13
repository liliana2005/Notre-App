import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'

const customerservice = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.bgcolored} source={require('@/assets/images/bgcolored.png')}/>
      <Text style={styles.text}> Custumer Service</Text>
      <View style={styles.inputContainer}>
        <Image style={styles.servicephoto} source={require('@/assets/images/servicephoto.png')}/>

      </View>
      <Image style={styles.bgcolored2} source={require('@/assets/images/bgcolored2.png')}/>
    </View>
  )
}

export default customerservice
const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        padding:5,
        alignItems:'center',

    },
    text:{
        textAlign:'center',
        fontSize:26,
        color:'#581380',
        fontWeight:'500',
        right:50,
       bottom:70,
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:20,
        marginHorizontal:10,
       backgroundColor:"white",
       borderWidth:2,
       width:335,
       height:220,
       alignItems:"center",
       borderColor:'#581380',
       bottom:40,
       
       },
    bgcolored:{
        resizeMode:'contain',
        height:300,
        width:220,
        top:-16,
        left:80,

    },
    bgcolored2:{
        resizeMode:'contain',
        height:330,
        width:220,
        bottom:85,
        right:80,
    },
    servicephoto:{
        resizeMode:'contain',
        height:180,
        width:200,
        left:10,
    }

})