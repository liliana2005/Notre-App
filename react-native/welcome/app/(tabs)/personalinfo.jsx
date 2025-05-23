import { View, Text,StyleSheet,TextInput ,Image,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';

const API_BASE_URL = 'http://192.168.150.138:5001/api'; // UPDATE to your server IP

const Personalinfo = () => {
   const [image, setImage] = useState(null);
   const [editMode, setEditMode] = useState(false);
   const [fullName, setFullName] = useState('');
   const [phone, setPhone] = useState('');
   const [originalValues, setOriginalValues] = useState({ 
        image: null,
        fullName: '',
        phone: ''
      });
      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = await AsyncStorage.getItem("authToken");
            console.log("Token récupéré :", token); // 🔍 Important
      
            if (!token) {
              console.warn("Aucun token trouvé !");
              return;
            }
      
            const response = await fetch(`${API_BASE_URL}/users/me`, {
              method: "GET",
              headers: { 'Authorization': `Bearer ${token}`,
              },
            });
      
            const data = await response.json();
            console.log("Réponse de /users/me :", data);
      
            if (!response.ok) {
              console.error("Erreur réponse:", data.message);
            } else {
              setFullName(data.fullName);
              setPhone(data.phone || '');
              setImage(data.profilePicture);
              setOriginalValues({
                fullName: data.fullName,
                phone: data.phone,
                image: data.profilePicture
              });
            }
          } catch (error) {
            console.error("Erreur réseau:", error);
          }
        };
      
        fetchUserData();
      }, []);
      
   const pickImage = async () => {
      // Only allow image selection when in edit mode
      if (!editMode) return;
  
      // If image exists, show delete/change options
      if (image) {
        Alert.alert(
          'Profile Picture',
          'Choose an option',
          [
            {
              text: 'Delete',
              onPress: () => setImage(null),
              style: 'destructive'
            },
            {
              text: 'Change',
              onPress: async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 1,
                });
                if (!result.canceled) {
                  setImage(result.assets[0].uri);
                }
              }
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ]
        );
        return;
      }
       let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
    }
    const handleEdit = () => {
      // Save current values before editing
      setOriginalValues({ image, fullName, phone });
      setEditMode(true);
    };
  
    const handleCancel = () => {
      // Revert to original values
      // Revenir aux valeurs sauvegardées
    setImage(originalValues.image);
    setFullName(originalValues.fullName);
    setPhone(originalValues.phone);
    setEditMode(false);
    };
  
    const handleSave = async () => {
      console.log("Bouton Save cliqué");
    
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log("Token récupéré:", token);
    
        let uploadedImageUrl = image;
    
        if (image && image.startsWith('file://')) {
          console.log("Upload d'une image locale");
          //const imageAsset = result.assets[0]; // ✅ Déclaration correcte

          const formData = new FormData();
          formData.append("file", {
            uri: image,
            name: "profile.jpg",
            type: "image/jpeg",
          });
          
    
          const uploadResponse = await fetch(`${API_BASE_URL}/users/upload-profile-picture`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          });
    
          const uploadData = await uploadResponse.json();
          console.log("Réponse upload:", uploadData);
    
          if (!uploadResponse.ok) {
            console.error('Erreur Cloudinary:', uploadData.message);
            Alert.alert("Erreur Upload", uploadData.message || "Échec upload image.");
            return;
          }
    
          uploadedImageUrl = uploadData.url;
        }
    
        console.log("Envoi des infos vers /users/update");
        const response = await fetch(`${API_BASE_URL}/users/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName,
            phone,
            profilePicture: uploadedImageUrl,
          }),
        });
    
        const data = await response.json();
        console.log("Réponse update:", data);
    
        if (!response.ok) {
          console.error("Erreur update:", data.message);
          Alert.alert("Erreur Update", data.message || "Échec mise à jour.");
        } else {
          Alert.alert("Succès", "Profil mis à jour !");
          setOriginalValues({
            fullName,
            phone,
            image: uploadedImageUrl,
          });
          setEditMode(false);
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
        Alert.alert("Erreur", "Une erreur est survenue.");
      }
    };
    
    
    
    
  
  return (

    <View style={styles.container}>
     
     <Image style={styles.bg} source={require('@/assets/images/perinfobg.png')}/>
   
     <Text style={styles.accounttext}> Personal information  </Text>
      <TouchableOpacity 
                 style={styles.profileCircle} 
                 onPress={pickImage}
                 disabled={!editMode} // Disable when not in edit mode
               >
                 {image ? (
                   <Image source={{ uri: image }} style={styles.profileImage} />
                 ) : (
                   <View>
                     <Text style={styles.profileText}>Profile picture</Text>
                     {editMode ? <Text style={styles.plusSign}>+</Text> : null}
                     {/*{editMode && <Text style={styles.plusSign}>+</Text>}*/}
                   </View>
     
                 )}
               </TouchableOpacity>
     <Text style={styles.accounttext2}> Username</Text>
     <View style={styles.inputContainer}>
     <TextInput 
     
      style={styles.TextInput} 
      value={fullName} 
      onChangeText={setFullName} 
      editable={editMode}
     />
     </View>
     <View style={styles.container2}>
        <Image style={styles.phonephoto} source={require('@/assets/images/phone.png')}/>
        <View style={styles.inputContainer2}>
        <TextInput  
         
          style={styles.TextInput} 
           value={phone} 
           onChangeText={setPhone} 
           keyboardType="phone-pad"
           editable={editMode}
         />
        </View>
     </View>
     <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.buttonWrapper} 
                onPress={editMode ? handleCancel:handleEdit}
              >
                <LinearGradient
                  colors={['#CDBDEC', '#7E4ACA', '#4E0976']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>
                    {editMode ? 'Cancel' : 'Edit profile'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              
              {editMode && (
                <TouchableOpacity 
                  style={styles.buttonWrapper} 
                  onPress={handleSave}
                >
                  <LinearGradient
                    colors={['#CDBDEC', '#7E4ACA', '#4E0976']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>Save modification</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>

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
   bottom:58,
  },
  addphoto:{
    justifyContent:'center',
    width:83,
    height:81,
    bottom:20,

  },
  accounttext2:{
    fontSize:24,
    color:'#581380',
    
   right:110,marginTop:30,
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
   inputContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:20,
   backgroundColor:"white",
   borderWidth:1,
   width:190,
   height:43,
   
   borderColor:'#581380',
   
   },
   container2:{
    flexDirection:'row',
    marginTop:30,
    marginHorizontal:10,
   },
   loginbotton:{
    flexDirection:"row",
    borderRadius:20,
    elevation:0,
    marginVertical:30,
    width:130,
    height:42,
    alignItems:"center",
    top:10,
  
   },
   logintext:{
    fontWeight:'500',
    fontSize:18,
   left:45,
    color:"white",
    
   },
  
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    top: 10,
    backgroundColor: '#B5A1DA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  plusSign: {
    color: '#FFB82B',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:29,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  buttonWrapper: {
    width: '48%',
  },
  gradientButton: {
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
})



