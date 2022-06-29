import React from 'react';
import {useColorScheme} from 'react-native';

import SignUp from '../SignUp';
import First from '../First';
import Taches from '../Taches/Taches';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator>
      <Tab.Screen name="Taches" component={Taches} />
      <Tab.Screen name="Statistiques" component={SignUp} />
      <Tab.Screen name="Profile" component={First} />
    </Tab.Navigator>
  );
};

export default App;
