import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, View} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Login from '../Login';

import SignUp from '../SignUp';
import Statistiques from '../Statistiques';
import First from '../First';
import Home from './Home';
import Ajout from '../Taches/Ajout';
import Modifier from '../Taches/Modifier';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Start = () => {
  return (
    <Router>
      <Scene key="Login" component={Login} title="Login" hideNavBar />
      <Scene key="SignUp" component={SignUp} title="SignUp" />
      <Scene key="Ajout" component={Ajout} title="Ajout" />
      <Scene key="Modifier" component={Modifier} title="Modifier" />
      <Scene key="Home" component={Home} title="Home" />
    </Router>
  );
};

export default Start;
