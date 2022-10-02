import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebase';


const AddButton = () => {

  const [isFav, setIsFav]= useState([]);


  const addArtToList= () =>{

    db.collection('MyArtWork').doc('LA').set({
      name:'Los Angeles',
      state:'CA',
      country:'USA'
    })
    .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });

  }


  return (
    <Pressable  onPress={addArtToList}>
    <Ionicons
    name="add-circle-outline"
    size={25}
    style={{marginRight:10, marginBottom:10, color:'white'}} />
    </Pressable>
  )
}

export default AddButton

const styles = StyleSheet.create({})