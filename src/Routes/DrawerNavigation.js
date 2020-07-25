import React, {Component, useEffect, useState} from 'react';
import Dashboard from '../components/screens/Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import MyCourses from '../components/screens/MyCourses/MyCourses';
import {IconStyles} from '../components/Styles';
import Library from '../components/screens/Library/Library';
import FreeVideos from '../components/screens/FreeVideos/FreeVideos';
import AddVideos from '../components/screens/Teacher/AddVideos';
import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';

const Tab = createBottomTabNavigator();

const DrawerNavigation = () => {
  const [userType, setUserType] = useState(3); //3 is for customer
  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const type = await AsyncStorage.getItem('userType');
        setUserType(parseInt(type));
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    };
    fetchUserType();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Explore') {
            iconName = 'ios-navigate';
          } else if (route.name === 'Free Videos') {
            iconName = 'videocam';
          } else if (route.name === 'Library') {
            iconName = 'ios-library';
          } else if (route.name === 'My Courses') {
            iconName = 'ios-play';
          } else if (route.name === 'Add Videos') {
            iconName = 'ios-add-circle';
          }
          return (
            <Icon
              size={IconStyles.iconSize}
              type={IconStyles.iconType}
              color={color}
              name={iconName}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: IconStyles.iconColor,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Explore" component={Dashboard} />
      <Tab.Screen name="Free Videos" component={FreeVideos} />
      {userType == 2 ? (
        <Tab.Screen name="Add Videos" component={AddVideos} />
      ) : null}
      <Tab.Screen name="My Courses" component={MyCourses} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
};

//For sample Don't Delete!!!!!!!!!!!

// class DrawerNavigation extends Component {
//   render() {
//     const Drawer = createDrawerNavigator();
//     return (
//       <Drawer.Navigator initialRouteName="Dashboard">
//         <Drawer.Screen name="Dashboard" component={Dashboard} />
//         {/* <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy} /> */}
//       </Drawer.Navigator>
//     );
//   }
// }
//For sample Don't Delete!!!!!!!!!!!

export default DrawerNavigation;
