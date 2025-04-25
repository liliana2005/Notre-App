import { View, Text,Image,StyleSheet,TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import bg from "@/assets/images/profilebg.png"
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {
  const router=useRouter();
   const personalinfo =()=>{
    router.push("/(tabs)/personalinfo")
   };
   const changepassword =()=>{
    router.push("/(tabs)/changepassword")
   };
   const serviceconstumer =()=>{
    router.push("/(tabs)/customerservice")
   }
   const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      router.replace('/sign-in');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
   <View style={styles.container}>
       <ImageBackground 
          source={bg}
          resizeMode="contain"
          style={styles.bg}>
           {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.username}>Hi, Username</Text>
      </View>

       </ImageBackground>
          {/* Profile Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={personalinfo}>
          <View>
          <Text style={styles.optionText}>Personal Information</Text>
          <Text style={styles.optionSubText}>Name, profile picture, phone number</Text>
          </View>
          <AntDesign name='right' size={22} style={styles.rightbottum}/>
       </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={changepassword}>
         <View>
         <Text style={styles.optionText}>Change Password</Text>
         <Text style={styles.optionSubText}>Choose a unique password to protect your account</Text>
         </View>
         <AntDesign name='right' size={22}  style={styles.rightbottum}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Change Email</Text>
          <AntDesign name='right' size={22}  style={styles.rightbottum}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Credit Card</Text>
          <AntDesign name='right'  size={22} style={styles.rightbottum}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <View>
          <Text style={styles.optionText}>Application Language</Text>
          <Text style={styles.optionSubText}>English</Text>
          </View>
          <AntDesign name='right' size={22}  style={styles.rightbottum}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={serviceconstumer}>
         <View>
         <Text style={styles.optionText}>Customer Service</Text>
         <Text style={styles.optionSubText}>chat with us</Text>
         </View>
          <AntDesign name='right' size={22}  style={styles.rightbottum}/>
        </TouchableOpacity>
      </View>
    


      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <AntDesign name='logout' size={25} color={'red'} />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
       

    
    </View>
  );
};

 
  
export default Profile
const styles =StyleSheet.create({
  
  bg:{
   width:360,
   height:200,
   resizeMode:'contain',
   bottom:18,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
   
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FFB82B',
    fontWeight: 'bold',
    top:50,
  },
  username: {
    fontSize: 18,
    color:'#581380',
    marginTop: 75,
  },
  optionsContainer: {
    marginLeft: 8,
  },
  option: {
    paddingVertical: 13,
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-between',
   paddingHorizontal:15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionSubText: {
    fontSize: 11,
    color: '#666',
  },
  logoutButton: {
   flexDirection:'row',
   marginLeft: 20,
   paddingVertical: 20,
   
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft:10,
  },
 
 
   
             
})