import { View, Text, StyleSheet,TextInput } from 'react-native'
import React from 'react'


const FormFeild = ({title,value,placeholder,handlechangetext,otherstyles, ...props}) => {
  return (
    <View >
      <Text style={styles.ftext}>{title}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
        <TextInput style={styles.text}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handlechangetext}

        
        
        

         />
        </View>
        
       
      </View>
      
      
    </View>
  )
}

export default FormFeild
const styles=StyleSheet.create({
ftext:{
    color:'#581380' , // Gold color for the text
    fontSize: 22,
    fontWeight: 500,
},
buttonContainer: {
  flexDirection: 'column',
 paddingBottom:20,
 marginleft:10,
 
 
},

button:{
  height:45,
    width:390,
    borderRadius:25,
    margintop:10,
    borderWidth:2,
    borderColor:'#581380',
    marginBottom:10,
    
    
},
text:{
  color:'black' , // Gold color for the text
  fontSize: 33,
  fontWeight: 200,
  
}

})