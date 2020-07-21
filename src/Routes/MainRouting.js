import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Style from '../components/Styles';
import DrawerNavigation from './DrawerNavigation';
import Login from '../components/screens/login';
import SplashScreen from '../components/screens/splashScreen';
import Swiper from '../components/screens/Swiper';
import Styles from '../components/Styles';
import Profile from '../components/screens/Profile';

const Stack = createStackNavigator();
const MainRouting = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Swiper"
          component={Swiper}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          component={DrawerNavigation}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
          name="Dashboard"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const headerStyles = {
  headerTitleStyle: {
    ...Style.fontFamily,
    marginLeft: -15,
    paddingLeft: 0,
  },
  headerStyle: {
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
    },
    elevation: 10,
    shadowRadius: 5,
  },
  headerRight: () => (
    <Image
      style={{height: 50, width: 50}}
      source={require('../assets/logo.jpg')}
    />
  ),
};

export default MainRouting;
