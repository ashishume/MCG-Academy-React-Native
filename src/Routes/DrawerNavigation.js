import React, {Component} from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../components/screens/Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import Search from '../components/screens/Search';
import Profile from '../components/screens/Profile';
import MyCourses from '../components/screens/MyCourses/MyCourses';
import {IconStyles} from '../components/Styles';

const Tab = createBottomTabNavigator();

const DrawerNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Explore') {
            iconName = 'ios-navigate';
          } else if (route.name === 'Search') {
            iconName = 'ios-search';
          } else if (route.name === 'Profile') {
            iconName = 'ios-person';
          } else if (route.name === 'MyCourses') {
            iconName = 'ios-play';
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
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="MyCourses" component={MyCourses} />
      <Tab.Screen name="Profile" component={Profile} />
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
