import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../components/EditProfile';
import ExhibitionScreen from '../screens/ExhibitionScreen';
const Stack = createStackNavigator();

export default function ProfileStackScreen({wishList, exhibitionData, setCurrent}) {
  const [profile, setProfile] = useState([]);
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#152238',
        },
        headerTitleAlign: 'left',
        headerTintColor: '#FFFFF3',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: '25',
        },
        headerBackImage: () => (
          <Ionicons
            name="ios-chevron-back"
            size={25}
            color="#FFFFF3"
            style={{ paddingLeft: 10 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Profile"
        options={{
          headerRight: () => (
            <FontAwesome5
              onPress={() =>
                navigation.navigate('EditProfile', { profile, setProfile })
              }
              name="user-edit"
              size={18}
              color="#FFFFF3"
              style={{ paddingRight: 10 }}
            />
          ),
        }}
      >
        {(props) => <ProfileScreen wishList={wishList} profile={profile} setProfile={setProfile} />}
      </Stack.Screen>
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
      name='ExhibitionStackScreen'
      options={{
          headerTitle: 'My ArtWork',
          headerBackTitleVisible: false,
        }}>

          {(props)=><ExhibitionScreen exhibitionData={exhibitionData} wishList={wishList} setCurrent={setCurrent}/>}
        </Stack.Screen>

    </Stack.Navigator>
  );
}
