import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground ,Dimensions} from 'react-native';
import logo from "@/assets/images/logo.png"
import bg from "@/assets/images/bg.png"
import { Link } from 'expo-router'
import { useRouter } from 'expo-router'


const WelcomeScreen = () => {
   const router=useRouter();
    const SignIn =()=>{
     router.push("/(auth)/sign-in")
    };
   return (
   <View style={styles.container}>
    <ImageBackground 
       source={bg}
       resizeMode="cover"
       style={styles.bg}>
            
       {/* Logo */}
      <Image source={logo}
       resizeMode="contain"
       style={styles.logo}
      ></Image>
    </ImageBackground>
              {/* Welcome Text */}
              <View style={styles.welcomecontainer}>
              <Text style={styles.welcomeText}>Welcome to</Text>
              </View>
      
       <View style={styles.namecontainer}>
              <Text style={styles.appName1}>Kh</Text><Text style={styles.appName2}>air DZ</Text>
        </View>
      

              {/* User Type Text */}
              <View style={styles.areyoucontainer}><Text style={styles.areYouText}>ARE YOU :</Text></View>
              

                {/* Buttons */}
              <View style={styles. buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={SignIn}>
                 <Text style={styles.buttonText}>Donor</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Organisation</Text>
               </TouchableOpacity>
        
              </View>
   
          </View>
      
  )
}
export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  bg:{
    width:518,
    height:400,
    
    justifyContent:'center',
    bottom:60,
    
    
    
  },
  logo: {
    width: 270,
    height: 270,
    marginTop:'40%',
    marginLeft:120,
    justifyContent:'center',
    
    
  },
  welcomeText: {
    fontSize: 30,
    color: '#581380',
    fontWeight: 400,

  },
  welcomecontainer:{
  top:'-2%'

  },


  namecontainer:{
  flexDirection:'row',
   top:'-2%',
   
  },
  appName1: {
    fontSize: 80,
    color: '#FFB82B', // Same color as "Khair DZ" in the image
    fontWeight: 'bold',
    marginBottom:60,

   
  },
  appName2:{
    fontSize: 80,
    color:'#581380' , // Same color as "Khair DZ" in the image
    fontWeight: 'bold',
    marginBottom:60,
  },
  areyoucontainer:{
    top:'-4%'
  },
  areYouText: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: '400',
    color: '#581380',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    margin:20,
    top:'-3%',

    justifyContent:'space-between',
  },
  button: {
    backgroundColor:'#581380', // Purple color for the buttons
    height:156,
    width:160,
    paddingTop: 60 ,paddingRight:20,paddingBottom:60,paddingLeft:20,
    borderRadius:100,
    marginHorizontal:10,
    marginBottom:70,
    


  },
  buttonText: {
    color:'#FFB82B' , // Gold color for the text
    fontSize: 18,
    fontWeight: '600',
    textAlign:'center'
  },
  
})

