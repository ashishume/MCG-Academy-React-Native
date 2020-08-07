import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Style from '../components/Styles';
import DrawerNavigation from './DrawerNavigation';
import Login from '../components/screens/login';
import SplashScreen from '../components/screens/splashScreen';
import Swiper from '../components/screens/Swiper';
import CourseDetails from '../components/screens/CourseDetails/CourseDetails';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import YoutubePlayerUI from '../components/Shared/YoutubePlayer';
import Profile from '../components/screens/ProfileSettings/Profile';
import CourseContent from '../components/screens/CourseContent/ContentTabs';
import FreeVideosContent from '../components/screens/FreeVideos/FreeVideosContent';
import InitialSetup from '../components/screens/InitialSetup';

//sub routes of profile
import Accounts from '../components/screens/ProfileSettings/Accounts';
import PrivacyPolicy from '../components/screens/ProfileSettings/PrivacyPolicy';
import TermsAndCondition from '../components/screens/ProfileSettings/TermsAndCondition';
import AboutUs from '../components/screens/ProfileSettings/AboutUs';
import Signup from '../components/screens/Auth/Signup';
import PreferencePicker from '../components/screens/Auth/PreferencePicker';
import TeacherWaitingPage from '../components/screens/TeacherWaitingPage';
import Search from '../components/screens/Search';
import ForgotPassword from '../components/screens/ForgotPassword';
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
  return (
    <NavigationContainer>
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
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InitialSetup"
          component={InitialSetup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TeacherWaitingPage"
          component={TeacherWaitingPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
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
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
        <Stack.Screen
          name="Accounts"
          component={Accounts}
          options={{
            headerShown: true,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
        <Stack.Screen
          name="Privacy Policy"
          component={PrivacyPolicy}
          options={{
            headerShown: true,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
        <Stack.Screen
          name="Terms and condition"
          component={TermsAndCondition}
          options={{
            headerShown: true,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
        <Stack.Screen
          name="About us"
          component={AboutUs}
          options={{
            headerShown: true,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />

        <Stack.Screen
          name="CourseContent"
          component={CourseContent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FreeVideoContent"
          component={FreeVideosContent}
          options={{
            headerShown: false,
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
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Preference"
          component={PreferencePicker}
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
};
const mapStateToProps = (state, ownProps) => {
  return {
    videoBody: state.visible.videoBody,
  };
};
export default connect(mapStateToProps, {})(MainRouting);
