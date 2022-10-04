import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebase';


const AddButton = ({setWishList, current}) => {

  console.warn(current)
  const addArtToList= () =>{
    // setWishList(prev=>[...prev, current]);
    db.collection('MyArtWork').add(current)
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