import { StyleSheet,Image,View, Text,TouchableOpacity ,TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons  from 'react-native-vector-icons/Ionicons'


const phonenumber = () => {
        const navigation =useNavigation();
       const signin =()=>{
         navigation.navigate("sign-in")
       };
       const verify =()=>{
        navigation.navigate("verifyphone")
       };
       
  return (
    <View style={styles.container}>
            <StatusBar style='dark'/>
            
             
               <TouchableOpacity style={styles.backButton} onPress={signin}>
                 <Ionicons name="arrow-back" size={30} color="purple" top="40" />
              </TouchableOpacity>
           
             <View style={styles.logo}>
              <Image source={require('@/assets/images/logo2.png')} resizeMode="contain"/>
             </View>
             
                <Text style={styles.accounttext}> add your phone number </Text>
                <Text style={styles.text}>Add your phone number to allow for </Text>
                <Text style={styles.text}> better communication and services</Text>
                <Text style={styles.text}>such receiving reports,alerts and </Text>
                <Text style={styles.text}>more...</Text>
                <View style={styles.phone}>
                  <Image source={require('@/assets/images/phone.png')} resizeMode="contain"/>
                   <View style={styles.inputContainer}>
                     
                     <TextInput style={styles.TextInput} placeholder="phone number"/>
                    </View>
                </View>
                <TouchableOpacity style={styles.loginbotton} onPress={verify}>
                    <LinearGradient
                        colors={['#CDBDEC', '#7E4ACA', '#4E0976']} // Three color gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginbotton}
                    >
                     <Text style={styles.logintext}>Verify</Text>
                    </LinearGradient>
                 </TouchableOpacity>
     </View>
    
  )
}

export default phonenumber
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
    fontSize:30,
    color:'#581380',
    fontWeight:'500',
   bottom:35,
  },
  text:{
    color:"#FFB82B",
    textAlign:"center",
    fontSize:18,
  },
  phone:{
    left:15,
    top:40,
    width:20,
  },
  inputContainer:{
    flexDirection:"row",
    borderRadius:20,
    marginHorizontal:10,
    elevation:0,
    marginVertical:60,
   backgroundColor:"white",
   borderWidth:2,
   width:160,
   height:53,
   alignItems:"center",
   borderColor:'#581380',
   bottom:115,
   left:150,

  },
  TextInput:{
    padding:9,
    margin:0,
    borderWidth:0,
    fontSize:15,
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