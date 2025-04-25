import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const FirstPage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SecondPage'); // Navigates to SecondPage and removes this screen from stack
    }, 4000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup in case the component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>إلى متى ؟</Text>
      <Text style={styles.english}>How long ?</Text>

      <Image 
        source={require('@/assets/moutasawil.png')} 
        style={styles.moutasawil} 
        resizeMode="contain" 
      />

      <Image 
        source={require('@/assets/Rectangle.png')} 
        style={styles.Rectangle} 
        resizeMode="contain"
      />

      <Image 
        source={require('@/assets/logo.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#581380',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  english: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  Rectangle: {
    width: 160,
    height: 360,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  moutasawil: {
    width: 400,
    height: 330,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -200 }],
  },
  logo: {
    width: 160,  
    height: 200,  
    position: 'absolute',
    top: 150,  
    right: 0,  
    right: 7,
  }
});

export default FirstPage;