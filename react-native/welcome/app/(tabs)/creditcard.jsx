import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreditCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Credit Card Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    color: '#600889',
  },
});

export default CreditCard;
