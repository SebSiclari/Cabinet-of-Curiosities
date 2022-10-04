import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import {useState, useEffect} from 'react'
import ExhibitionScreen from '../screens/ExhibitionScreen';
import ExhibitionInfo from '../components/ExhibitionInfo';
import AddButton from '../components/AddButton';
import { getActionFromState } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function ExhibitionStackScreen({ exhibitionData }) {



  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#152238',
        },
        headerBackImage: () => (
          <Ionicons
            name="ios-chevron-back"
            size={25}
            color="#FFFFF3"
            style={{ paddingLeft: 10 }}
          />
        ),
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerTintColor: '#FFFFF3',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: '25',
        },
      }}
    >
      <Stack.Screen  name="Current">
        {(props) => <ExhibitionScreen exhibitionData={exhibitionData} />}
      </Stack.Screen>
      <Stack.Screen
        name="ExhibitionInfo"
        component={ExhibitionInfo}
        options={{ headerTitle: "",
        headerRight:()=><AddButton exhibitionData={exhibitionData}/>
        }}

      />
    </Stack.Navigator>
  );
}
