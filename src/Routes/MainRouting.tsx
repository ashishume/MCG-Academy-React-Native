import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// import {connect} from 'react-redux';
import DrawerNavigation from './DrawerNavigation';

//all the screen routes
import {SCREEN_ROUTES} from './ScreenRoutes';
const Stack = createStackNavigator();
const MainRouting = (props: any) => {
  const linking = {
    prefixes: [
      'https://www.mcgacademy.in',
      'http://www.mcgacademy.in',
      'mcgacademy://',
    ],
    config: {
      screens: {
        course: 'course/:courseId',
        videos: 'videos/:videoId',
        exam: 'exam/:testSeriesId',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {SCREEN_ROUTES.map(item => {
          return (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={{
                headerShown: item.header,
                cardStyle: {
                  backgroundColor: '#fff',
                },
              }}
            />
          );
        })}

        <Stack.Screen //ALl the tab routes
          name="Dashboard"
          component={DrawerNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     videoBody: state.visible.videoBody,
//   };
// };
export default MainRouting;
