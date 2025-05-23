import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Bar from './Bar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Home = ({ route }) => {
  const navigation = useNavigation();
  
  // State for managing projects - this is the key fix
  const [projects, setProjects] = useState([]);
  
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [originalValues, setOriginalValues] = useState({
    orgName: '',
    email: '',
    phone: '',
    address: '',
    image: null
  });

  // Function to add new project - this will be passed to NewProject
  const addProject = (newProject) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  // Listen for when we return from NewProject with a new project
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.newProject) {
        addProject(route.params.newProject);
        // Clear the parameter to prevent adding the same project multiple times
        navigation.setParams({ newProject: undefined });
      }
    }, [route.params?.newProject])
  );

  const pickImage = async () => {
    if (!editMode) return;

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
  };

  const handleEdit = () => {
    setOriginalValues({
      orgName,
      email,
      phone,
      address,
      image
    });
    setEditMode(true);
  };

  const handleCancel = () => {
    setOrgName(originalValues.orgName);
    setEmail(originalValues.email);
    setPhone(originalValues.phone);
    setAddress(originalValues.address);
    setImage(originalValues.image);
    setEditMode(false);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const calculatePercentage = (collected, target) => {
    return Math.min(100, Math.round((collected / target) * 100));
  };

  const navigateToNewProject = () => {
    navigation.navigate('NewProject', { 
      addProject: addProject // Pass the addProject function
    });
  };

   return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={require('@/assets/logo2.png')} style={styles.logo} />
          
          <View style={styles.profileSection}>
            <TouchableOpacity 
              style={styles.profileCircle} 
              onPress={pickImage}
              disabled={!editMode}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <>
                  <Text style={styles.profileText}>Profile picture</Text>
                  {editMode && <Text style={styles.plusSign}>+</Text>}
                </>
              )}
            </TouchableOpacity>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Organisation name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  placeholderTextColor="grey"
                  value={orgName}
                  onChangeText={setOrgName}
                  editable={editMode}
                />
              </View>
              
              <View style={[styles.inputGroup, { marginBottom: 8 }]}>
                <Text style={styles.label}>Organisation email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="grey"
                  value={email}
                  onChangeText={setEmail}
                  editable={editMode}
                />
              </View>
             
              <View style={[styles.inputGroup, { marginBottom: 8 }]}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  placeholderTextColor="grey"
                  value={phone}
                  onChangeText={(text) => {
                    if (/^\d*$/.test(text) && text.length <= 10) {
                      setPhone(text);
                    }
                  }}
                  editable={editMode}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  placeholderTextColor="grey"
                  value={address}
                  onChangeText={setAddress}
                  editable={editMode}
                />
              </View>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.buttonWrapper} 
              onPress={editMode ? handleCancel : handleEdit}
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

          <Text style={styles.announcementTitle}>Announcement</Text>
          
          {/* Projects List - Now using the projects from state */}
          {projects.length > 0 ? (
            projects.map(project => {
              const percentage = calculatePercentage(project.collectedAmount, project.targetAmount);
              
              return (
                <View key={project.id} style={styles.projectCard}>
                  <View style={styles.projectImageSection}>
                    <View style={styles.projectImageContainer}>
                      <Image source={project.image} style={styles.projectImage} />
                    </View>
                    <Text style={styles.deadlineText}>{project.deadline}</Text>
                  </View>
                  
                  <View style={styles.projectInfo}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <View style={styles.progressBarContainer}>
                      <View style={[styles.progressBar, { width: `${percentage}%` }]} />
                    </View>
                    <Text style={styles.percentageText}>{percentage}%</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.noProjectsContainer}>
              <Text style={styles.noProjectsText}>No projects yet. Create your first project!</Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <Bar onAddProject={navigateToNewProject} />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 578, // Add padding to prevent content from being hidden behind the bar
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    top: 6,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    top: 40,
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
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    color: '#581380',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#581380',
    borderRadius: 25,
    flexShrink: 1,
    padding: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 14,
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
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB82B',
    marginTop: 30,
    marginBottom: 15,
  },
  projectCard: {
    backgroundColor: 'rgba(255, 184, 43, 0.36)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    height: 160,
  },
  projectImageSection: {
    alignItems: 'center',
    marginRight: 15,
  },
  projectImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deadlineText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight:'bold',
    color: '#581380',
  },
  projectInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  projectName: {
    color: '#581380',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
     textAlign: 'center',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(255, 184, 43, 0.36)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#581380',
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFB82B',
  },
  percentageText: {
    fontSize: 12,
    color: '#581380',
    alignSelf: 'flex-end',
  },
  noProjectsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 184, 43, 0.1)',
    borderRadius: 10,
    marginTop: 20,
  },
  noProjectsText: {
    color: '#581380',
    fontSize: 16,
    textAlign: 'center',
   
  },
});

export default Home;