import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebase';


const AddButton = ({exhibitionData}) => {

  const [title, setTitle]=useState(null);
  const [poster,setPoster]=useState(null)
  const [begindate, setBeginDate] = useState(null)
  const [enddate, setEndDate]= useState(null)
  const [venues, setVenues]= useState(null)


const setData=async ()=>{
   await setTitle(exhibitionData.records.map(item=> item.title));
   await setPoster(exhibitionData.records.map(item=> item.poster))
   await setBeginDate(exhibitionData.records.map(item=> item.begindate));
   await setEndDate(exhibitionData.records.map(item=> item.enddate));
   await setVenues(exhibitionData.records.map(item=> item.venues.map(item=>item.fullname) ));
}


useEffect(()=>{
  setData()
},[])

// console.warn(title)

console.warn(venues)




  const [isFav, setIsFav]= useState([]);


  const addArtToList= () =>{

    db.collection('MyArtWork').add({
      title: title,
      begindate: begindate,
      enddate: enddate,
      venues: venues,

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