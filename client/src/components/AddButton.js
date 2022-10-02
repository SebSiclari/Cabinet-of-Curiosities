import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';



const AddButton = () => {

  const [isFav, setIsFav]= useState([]);


  const addArtToList= () =>{
    
  }

  
  return (
    <Pressable  onPress={()=>{console.warn('working')}}>
    <Ionicons
    name="add-circle-outline"
    size={25}
    style={{marginRight:10, marginBottom:10, color:'white'}} />
    </Pressable>
  )
}

export default AddButton

const styles = StyleSheet.create({})