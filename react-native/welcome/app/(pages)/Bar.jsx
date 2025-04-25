import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const Bar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [hasNotifications] = React.useState(true);

  // Determine active tab based on current route
  const isHomeActive = route.name === 'Home';
  const isNotificationActive = route.name === 'Notification';

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        {/* Profile/Home Button */}
        <TouchableOpacity
          style={styles.profileButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <View style={[
            styles.profileIconContainer,
            isHomeActive && styles.activeProfileIcon
          ]}>
            <Icon 
              name="user" 
              size={24} 
              color={isHomeActive ? '#FFB82B' : '#581380'} 
            />
          </View>
          <Text style={[styles.tabText, { color: isHomeActive ? '#FFB82B' : '#581380' }]}>
            Profile
          </Text>
        </TouchableOpacity>

        {/* Floating Add Button */}
        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => navigation.navigate('NewProject')}
        >
          <View style={styles.addButton}>
            <View style={styles.addButtonInner}>
              <Icon name="plus" size={40} color="#FFB82B" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Notifications Button */}
        <TouchableOpacity 
          style={styles.notificationButton} 
          onPress={() => navigation.navigate('Notification')}
        >
          <View>
            <Icon 
              name="bell" 
              size={24} 
              color={isNotificationActive ? '#FFB82B' : '#581380'} 
            />
            {hasNotifications && (
              <View style={styles.notificationDot} />
            )}
          </View>
          <Text style={[styles.tabText, { color: isNotificationActive ? '#FFB82B' : '#581380' }]}>
            Notifications
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'white', // Add background for shadow visibility
    },
    bottomBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 400,
      height: 90,
      backgroundColor: '#E4DDF2',
      borderRadius: 30,
      position: 'relative',
      paddingHorizontal: 30,
      right: 20,
      
      
    },
    profileButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    notificationButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileIconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#581380',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    activeProfileIcon: {
      backgroundColor: '#E4DDF2',
      borderColor: '#FFB82B',
    },
    tabText: {
      fontSize: 12,
      marginTop: 4,
      fontWeight: '500',
    },
    floatingButton: {
      position: 'absolute',
      top: -36,
      left: '58%',
      marginLeft: -36,
      width: 72,
      height: 72,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1, // Ensure it appears above other elements
    },
    addButton: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: '#581380',
      alignItems: 'center',
      justifyContent: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#581380',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.6,
          shadowRadius: 12,
        },
        android: {
          elevation: 15,
          shadowColor: '#581380',
          overflow: 'visible',
        },
      }),
    },
    addButtonInner: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notificationDot: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'red',
    },
  });
  
  export default Bar;