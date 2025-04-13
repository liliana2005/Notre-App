import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const categories = [
  { title: "Urgent Projects", icon: "cell-tower", color: "#FF5252" },
  { title: "Blood donation", icon: "bloodtype", color: "#D32F2F" },
  { title: "Education", icon: "school", color: "#1976D2" },
  { title: "Medical and health", icon: "medical-services", color: "#388E3C" },
  { title: "Other", icon: "more-horiz", color: "#616161" }
];

export default function App() {
   const router=useRouter();
       const details =()=>{
        router.push("/(tabs)/details")
       };
  return (
    <View style={styles.container}>
      {/* Notification Button */}
      <TouchableOpacity style={styles.notiButton}>
        <Ionicons name="notifications-outline" size={30} color="purple" />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity key={index} style={styles.category}>
            <MaterialIcons name={item.icon} size={24} color={item.color} />
            <Text style={styles.categoryText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Images */}
      <ScrollView contentContainerStyle={styles.imageScroll}>
        <TouchableOpacity onPress={details}>
        <View style={styles.imageContainer} >
          <Image source={require('@/assets/images/projectpho1.png')} style={styles.photo} />
        </View>
        </TouchableOpacity>
       
        <TouchableOpacity>
          <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/projectpho2.png')} style={styles.photo} />
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/projectpho3.png')} style={styles.photo} />
        </View>
        </TouchableOpacity>
       
        <TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/projectpho4.png')} style={styles.photo} />
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/projectpho5.png')} style={styles.photo} />
        </View>
        </TouchableOpacity>

       
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    
  },
  notiButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 45,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 99,
    marginBottom:-10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoryContainer: {
    marginTop: 23,
    marginBottom:10,
    flexDirection: 'row',
  },
  category: {
    width: 70, 
    height: 60, 
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderColor: "#581380",
    borderWidth: 2,
    marginRight: 10,
    elevation: 5,
    marginBottom:30,
    
  },
  categoryText: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 3,
  },
  imageScroll: {
   paddingTop:50,
   bottom:40,
   
  },
  imageContainer: {
    alignItems: 'center',  
   
   
  },
  photo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop:-30,
  },
});