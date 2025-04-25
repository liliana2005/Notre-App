import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DonorInfo = ({ navigation, route }) => {
  // Get donor data passed from Notification screen
  const { donor } = route.params;

  return (
    <View style={styles.pageContainer}>
      {/* Background elements */}
      <View style={styles.background} />
      <Image source={require('@/assets/background.png')} style={styles.rectangle} />

      {/* Header with back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color='#581380' />
      </TouchableOpacity>
      <Text style={styles.headerText}>Donor Information</Text>

      {/* Scrollable content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Donor Profile Section */}
        <View style={styles.profileContainer}>
          <Image source={donor.profilePic} style={styles.profileImage} />
          <Text style={styles.donorName}>{donor.donorName}</Text>
          <Text style={styles.donationTime}>Last donation: {donor.time}</Text>
        </View>

        {/* Donation Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={24} color="#581380" />
            <Text style={styles.detailText}>Member since: January 2023</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="heart-outline" size={24} color="#581380" />
            <Text style={styles.detailText}>Total donations: 5</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={24} color="#581380" />
            <Text style={styles.detailText}>Location: Algiers, Algeria</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={24} color="#581380" />
            <Text style={styles.detailText}>Contact: +213 XXX XXX XXX</Text>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <Text style={styles.activityText}>Donated 500 DZD - 15 May 2023</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <Text style={styles.activityText}>Donated clothes - 2 April 2023</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <Text style={styles.activityText}>Volunteered at event - 20 March 2023</Text>
          </View>
        </View>
      </ScrollView>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 2,
  },
  headerText: {
    position: 'absolute',
    top: 60,
    left: 60,
    fontSize: 24,
    color: '#581380',
    fontWeight: 'bold',
    zIndex: 2,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 120,
  },
  contentContainer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#B5A1DA',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#581380',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#581380',
    marginBottom: 15,
  },
  donorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#581380',
    marginBottom: 5,
  },
  donationTime: {
    fontSize: 16,
    color: '#4A306D',
  },
  detailsContainer: {
    backgroundColor: '#B5A1DA',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#581380',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 15,
    color: 'black',
  },
  activityContainer: {
    backgroundColor: '#B5A1DA',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#581380',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#581380',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#581380',
    marginRight: 10,
  },
  activityText: {
    fontSize: 14,
    color: 'black',
  },
});

export default DonorInfo;