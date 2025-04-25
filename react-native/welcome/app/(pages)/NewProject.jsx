import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity,Platform,KeyboardAvoidingView, Dimensions, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient'; // Import gradient for the button
import { useNavigation } from '@react-navigation/native';

const NewProject = () => {
      const navigation = useNavigation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Category');
  const [title, setTitle] = useState('');
  const options = ['Health & Medical', 'Food & Clothes', 'Education', 'Construction'];
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [deadline, setDeadline] = useState('');

  
  const handleUploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Date formatting function
  const formatDateInput = (input) => {
    let numbers = input.replace(/\D/g, '');
    if (numbers.length > 8) numbers = numbers.substring(0, 8);
    
    let formatted = '';
    if (numbers.length > 0) {
      formatted = numbers.substring(0, 2);
      if (numbers.length > 2) {
        formatted += '/' + numbers.substring(2, 4);
        if (numbers.length > 4) {
          formatted += '/' + numbers.substring(4, 8);
        }
      }
    }
    return formatted;
  };

  const handleDeadlineChange = (text) => {
    setDeadline(formatDateInput(text));
  };
  const handlePost = () => {
    // Handle post submission
    console.log("Posting:", { title, description, selectedOption, quantity, deadline });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.container}>
        {/* Background elements */}
        <View style={styles.background} />
        <Image source={require('@/assets/background.png')} style={styles.rectangle} resizeMode="cover" />
        
        {/* Header */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color='#581380' />
        </TouchableOpacity>
        <Text style={styles.NewPostText}>New Project</Text>
      
      {/* Dropdown Selector */}
      <View style={dropdownStyles.container}>
        <TouchableOpacity style={dropdownStyles.dropdownBox} onPress={() => setIsOpen(!isOpen)}>
          <Text style={dropdownStyles.selectedText}>{selectedOption}</Text>
          <View style={[dropdownStyles.caret, { transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }]} />
        </TouchableOpacity>

        {isOpen && (
          <View style={dropdownStyles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={dropdownStyles.option}
                onPress={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
              >
                <Text style={dropdownStyles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Title Section */}
      <View style={titleStyles.container}>
        <Text style={titleStyles.label}>Title</Text>
        <View style={titleStyles.inputBox}>
          <TextInput
            style={titleStyles.input}
            placeholder="Enter your title..."
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
        </View>
      </View>

      {/* Description Section */}
      <View style={descriptionStyles.container}>
        <Text style={descriptionStyles.label}>Description</Text>
        <View style={descriptionStyles.inputBox}>
          <TextInput
            style={descriptionStyles.input}
            placeholder="Enter your description..."
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      {/* Upload Image Section */}
      <View style={uploadStyles.container}>
        <Text style={uploadStyles.label}>Upload Image</Text>
        <TouchableOpacity style={uploadStyles.uploadBox} onPress={handleUploadImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={uploadStyles.previewImage} />
          ) : (
            <>
              <MaterialIcons name="image" size={50} color="#581380" style={uploadStyles.imageIcon} />
              <View style={uploadStyles.plusIcon}>
                <Ionicons name="add" size={20} color="white" />
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Quantity and Deadline Section */}
      <View style={inputGroupStyles.container}>
        {/* Quantity Needed */}
        <View style={inputGroupStyles.inputContainer}>
          <Text style={inputGroupStyles.label}>Quantity needed</Text>
          <View style={inputGroupStyles.currencyInput}>
            <Text style={inputGroupStyles.currencySymbol}>DA</Text>
            <TextInput
              style={inputGroupStyles.input}
              placeholder="0"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
          <View style={inputGroupStyles.underline} />
        </View>

        {/* Deadline */}
        <View style={inputGroupStyles.inputContainer}>
          <Text style={inputGroupStyles.label}>Dead Line</Text>
          <TextInput
            style={[inputGroupStyles.input, { textAlign: 'center' }]}
            placeholder="dd/mm/yyyy"
            value={deadline}
            onChangeText={handleDeadlineChange}
            keyboardType="number-pad"
            maxLength={10}
          />
          <View style={inputGroupStyles.underline} />
        </View>
      </View>
       {/* Add this Post Button at the end */}
      <View style={postButtonStyles.container}>
        <TouchableOpacity onPress={handlePost}>
          <LinearGradient
            colors={['#CDBDEC', '#7E4ACA', '#4E0976']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={postButtonStyles.button}
          >
            <Text style={postButtonStyles.text}>Post</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={footerStyles.container}>
          <Text style={footerStyles.text}>
            <Text style={footerStyles.khText}>.Kh</Text>
            <Text style={footerStyles.dzText}>air DZ.</Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(181, 161, 218, 1)',
  },
  rectangle: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('window').height - -30,
    position: 'absolute',
    top: 60, left: 0,
  },
  backButton: {
    position: 'absolute',
    position: 'absolute',
    top: 88, left: 13,
  },
  NewPostText: {
    position: 'absolute',
    top: 80, left: 60,
    fontSize: 30, color: '#581380',
    fontWeight: 'bold',
  },

});

const dropdownStyles = StyleSheet.create({
  container: {
    width: 200,
    position: 'absolute',
    top: 130, left: 30,
    zIndex: 10,
  },
  dropdownBox: {
    borderColor: '#581380',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 230,
  },
  selectedText: {
    color: '#581380',
    fontSize: 18,
    fontWeight: 'bold',
  },
  caret: {
    width: 0, height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFB82B',
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderColor: '#581380',
    borderWidth: 2,
    marginTop: 5,
    borderRadius: 15,
    overflow: 'hidden',
    left: 60,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(115, 112, 116,0.1)',
  },
  optionText: {
    color: '#581380',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const titleStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 200, left: 30,
    width: 300,
    borderRadius: 15,
  },
  label: {
    color: '#581380',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputBox: {
    backgroundColor: 'white',
    borderColor: '#581380',
    borderWidth: 2,
    borderRadius: 15,
    padding: 12,
    width: '300',
  },
  input: {
    color: '#581380',
    fontSize: 14,
  },
});

const descriptionStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 310, left: 30,
    width: 300,
  },
  label: {
    color: '#581380',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputBox: {
    backgroundColor: 'white',
    borderColor: '#581380',
    borderWidth: 2,
    borderRadius: 15,
    padding: 12,
    width: 300,
    height: 130,
  },
  input: {
    color: '#581380',
    fontSize: 16,
    height: '100%',
  },
});

const uploadStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 480, left: 30,
    alignItems: 'center',
  },
  label: {
    color: '#581380',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  uploadBox: {
    width: 60, height: 60,
    borderWidth: 2,
    borderColor: '#581380',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'relative',
    left: 5,
  },
  imageIcon: {
    position: 'absolute',
    top: 1, left: 5,
    zIndex: 1,
  },
  plusIcon: {
    position: 'absolute',
    top: 1, right: 5,
    backgroundColor: '#581380',
    borderRadius: 12,
    width: 20, height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 3,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

const inputGroupStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 590, left: 30, right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '48%',
  },
  label: {
    color: '#581380',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
  },
  currencyInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    color: '#581380',
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
  input: {
    color: '#581380',
    fontSize: 16,
    paddingVertical: 5,
  },
  underline: {
    height: 1,
    backgroundColor: '#581380',
    marginTop: 5,
  },
});
const postButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left:250,
    width: '100%',
    alignItems: 'left',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
const footerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontFamily: 'AbrilFatface-Regular',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  khText: {
    color: '#FFB82B',
  },
  dzText: {
    color: '#581380',
  },
});
export default NewProject;