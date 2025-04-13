import { TouchableOpacity,Text ,StyleSheet} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const CustomButton = ({title,handelpress,containerStyles,textStyles}) => {
  return (
    <TouchableOpacity  >
        
        <LinearGradient 
        colors={['#CDBDEC','#7E4ACA','#4E0976']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.loginButton}
      >
        <Text  style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
        

      
  )
}

export default CustomButton
const styles = StyleSheet.create ({
   
    loginButton: {
        padding: 12,
        borderRadius: 20,
        width:148,
        height:50,
        padding:10,
        alignItems: 'center',
      },
      buttonText: {
        color:'white' , // Gold color for the text
        fontSize: 25,
        fontWeight: '600',
        textAlign:'center'
      },
})