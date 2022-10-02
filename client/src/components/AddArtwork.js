import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import * as Firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';

import { auth, db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

// This is the  Add ArtWork Button in the top right in the ArtWork Screen

const AddArtwork = ({ setArtworks }) => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [medium, setMedium] = useState('');

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigation = useNavigation();

  // This function lets you access local photos of the user so they
  // can Select and Post
    const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Collect Button


  // TESTS FOR HANDLE SUBMIT


  const handleSubmit = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    // FIREBASE CODE
    // This sends the data that you input when you press the collect button
    // to the Firebase database.

    const ref = Firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log('download url : ', url);
          blob.close();
          // return url;

          let user = auth.currentUser;
          console.log('user.uid: ', user.uid);

          const dbRef = db
            .collection('users')
            .doc(user.uid)
            .collection('artworks')
            .doc();

          const id = dbRef.id;
          console.log(id);

          // Thesere are the propertie sent to the firebase database when you click
          // the collection button
          let saved = {
            id: id,
            artist: artist,
            title: title,
            year: year,
            medium: medium,
            image: url,
          };


          setArtworks((prev) => [...prev, saved]);


          // We need to read the firebase doc for this.
          dbRef
            .set(saved)
            .then(() => {
              setTimeout(() => {}, 10000);
              navigation.navigate('Artwork');
            })
            .catch((error) => {
              console.log(error);
            });
        });
      },
    );
  };

  // The ADD ARTWORK componenet is the whole adding and putting in iformation screen
  // maybe we could break it up into smaller components
  // for example makeng the text input a speeract componeent form the image
  // and making the button its own component

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.imageBox} />
      ) : (
        <Pressable>
          <ImageBackground
            resizeMode="cover"
            source={require('../assets/images/add-image-laticon.png')}
            imageStyle={{ opacity: 0.85 }}
          >
            <Text style={styles.imageBox} onPress={handlePickImage} />
          </ImageBackground>
        </Pressable>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Artist"
          value={artist}
          onChangeText={(text) => setArtist(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Year"
          value={year}
          onChangeText={(text) => setYear(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Medium"
          value={medium}
          onChangeText={(text) => setMedium(text)}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.collectButton}>
        {!uploading ? (
          <Pressable onPress={handleSubmit}>
            <Text style={styles.collectText}>COLLECT</Text>
          </Pressable>
        ) : (
          <ActivityIndicator size="small" color="#f0f0f0" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  inputContainer: {
    width: '80%',
    marginTop: 30,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 7,
  },
  collectButton: {
    width: 100,
    padding: 10,
    marginTop: 50,
    elevation: 2,
    borderRadius: 20,
    backgroundColor: '#152238',
  },
  collectText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default AddArtwork;
