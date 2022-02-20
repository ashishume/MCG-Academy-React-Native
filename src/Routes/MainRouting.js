import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import YoutubePlayerUI from '../components/Shared/YoutubePlayer';
import DrawerNavigation from './DrawerNavigation';

//all the screen routes
import {SCREEN_ROUTES} from './ScreenRoutes';
const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 4000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const MainRouting = (props) => {
  const linking = {
    prefixes: [
      'https://www.mcgacademy.in',
      'http://www.mcgacademy.in',
      'mcgacademy://',
    ],
    config: {
      screens: {
        course: 'course/:courseId',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {props.videoBody.introVideoUrl ? (
        <YoutubePlayerUI
          key={props.videoBody.introVideoUrl}
          videoId={props.videoBody.introVideoUrl}
          videoTitle={props.videoBody.courseTitle}
        />
      ) : null}
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}>
        {SCREEN_ROUTES.map((item) => {
          return (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={{
                headerShown: item.header,
                cardStyle:
                  item.backgroundColor !== ''
                    ? {backgroundColor: item.backgroundColor}
                    : '',
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

const mapStateToProps = (state, ownProps) => {
  return {
    videoBody: state.visible.videoBody,
  };
};
export default connect(mapStateToProps, {})(MainRouting);
