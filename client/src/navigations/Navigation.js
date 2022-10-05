import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { getExhibitions } from '../services/exhibitionService';
import HomeStackScreen from '../navigations/HomeStackScreen';
import ExhibitionStackScreen from '../navigations/ExhibitionStackScreen';
import ArtworkStackScreen from '../navigations/ArtworkStackScreen';
import TicketStackScreen from '../navigations/TicketStackScreen';
import ProfileStackScreen from '../navigations/ProfileStackScreen';
import { db } from '../../firebase';
// import MyArtWork from '../screens/MyArtWork'

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [exhibitionData, setExhibitionData] = useState('');
  const [wishList, setWishList]= useState([])
  const [current, setCurrent] = useState([])



  const getWishList= async() => {

    try{
     const data= await db.collection('MyArtWork').get().then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ",  doc.data());
        setWishList(prev=> [...prev, doc.data()])
    });
    console.warn(wishList)

    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    }

    catch(e){
      console.log(e);
    }
  }




  const fetchData = async () => {
    try {
      const result = await getExhibitions();
      setExhibitionData(result);
    } catch (error) {
      console.log('[ERROR]', error);
    }
  };

  useEffect(() => {
    fetchData();
    getWishList();
  }, []);



  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          title: '',
          tabBarActiveTintColor: '#FFFFF3',
          tabBarInactiveTintColor: '#a9a9a9',
          tabBarLabelStyle: { fontSize: 10 },
          tabBarStyle: [{ display: 'flex', backgroundColor: '#152238' }, null],
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="HomeTab"
          options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        >
          {(props) => <HomeStackScreen exhibitionData={exhibitionData} />}
        </Tab.Screen>
        <Tab.Screen
          name="current"
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="museum" color={color} size={size} />
            ),
          }}
        >
          {(props) => <ExhibitionStackScreen wishList={wishList} setWishList={setWishList} current={current} setCurrent={setCurrent}  exhibitionData={exhibitionData} />}
        </Tab.Screen>
        <Tab.Screen
          name="ArtworkTab"
          component={ArtworkStackScreen}
          options={{
            unmountOnBlur: true,
            // tabBarLabel: 'Cabinet',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="color-palette" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="TicketTab"
          component={TicketStackScreen}
          options={{
            // tabBarLabel: 'Ticket',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="ticket-alt" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
       >
       {(props)=> <ProfileStackScreen wishList={wishList} />}
       </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
