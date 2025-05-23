import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Bar from './Bar';
import { useRouter } from 'expo-router';
const mockNotifications = [
  {
    id: '1',
    donorName: 'John Doe',
    profilePic: require('@/assets/profile2.jpg'),
    action: 'donated',
    time: '12:00',
  },
  {
    id: '2',
    donorName: 'Jane Smith',
    profilePic: require('@/assets/profile1.jpg'),
    action: 'donated',
    time : '20:00'},
    {
      id: '3',
      donorName: 'John Doe',
      profilePic: require('@/assets/profile2.jpg'),
      action: 'donated',
      time: '12:00',
    },
    {
      id: '4',
      donorName: 'Jane Smith',
      profilePic: require('@/assets/profile1.jpg'),
      action: 'donated',
      time : '20:00'},
      {
        id: '5',
        donorName: 'John Doe',
        profilePic: require('@/assets/profile2.jpg'),
        action: 'donated',
        time: '12:00',
      },
      {
        id: '6',
        donorName: 'Jane Smith',
        profilePic: require('@/assets/profile1.jpg'),
        action: 'donated',
        time : '20:00'},]
const Notification = () => {
  const router = useRouter();
  return (
    <View style={styles.pageContainer}>
      {/* Background elements - moved to absolute positioning */}
      <View style={styles.background} />
      <Image source={require('@/assets/background.png')} style={styles.rectangle} />

      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color='#581380' />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      {/* Expanded Scrollable Area */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <FlatList
          data={mockNotifications}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Image source={item.profilePic} style={styles.profileImage} />
              <View style={styles.textContainer}>
              <Text>
  <Text style={styles.donorName}>{item.donorName}</Text>
  <Text style={styles.actionText}> {item.action}</Text>
</Text>
                <TouchableOpacity onPress={() => navigation.navigate('DonorInfo', { donor: item })}>
                  <Text style={styles.seeMore}>See more</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <Bar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    top: 0, 
    left: 0, 
    right: 0,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(181, 161, 218, 1)',
  },
  rectangle: {
    width: '100%',
    height: Dimensions.get('window').height - -30,
    position: 'absolute',
    top: 60, 
    left: 0,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    zIndex: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#581380',
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
    marginTop: 120,  // Space for header
    marginBottom: 80, // Space for bottom bar
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#B5A1DA',
    borderRadius: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: '#581380',
    minHeight: 40,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#581380',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  donorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.47)' ,
    marginVertical: 3,
  },
  seeMore: {
    color: '#581380',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  timeText: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#581380',
    fontWeight: '600',
  },
  separator: {
    height: 15,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Notification;