import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebase';


const AddButton = ({setWishList, current}) => {


  const [isFav, setIsFav]= useState(false)




  const addArtToList= () =>{
    setIsFav(true)
    db.collection('MyArtWork').add(current)
    .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  })
}


  const handleRemove= () => {
    if(isFav){
    setIsFav(false)
  //   db.collection('MyArtWork').doc(current.id).delete().then(() => {
  //     console.log("Document successfully deleted!");
  // }).catch((error) => {
  //     console.error("Error removing document: ", error);
  // });
}
  }


  return (
    <Pressable  onPress={ isFav ? handleRemove : addArtToList}>
   { isFav ? <Ionicons
    name="add-circle"
    size={25}
    style={{marginRight:10, marginBottom:10, color:'white'}} /> : <Ionicons
    name="add-circle-outline"
    size={25}
    style={{marginRight:10, marginBottom:10, color:'white'}} />
    }
    </Pressable>
  )
}

export default AddButton

const styles = StyleSheet.create({})