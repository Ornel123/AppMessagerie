import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from './src/SignUp';
import Statistiques from './src/Statistiques';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Accueil} />
      <Tab.Screen name="Settings" component={Statistiques} />
    </Tab.Navigator>
  );
}

export default MyTabs;