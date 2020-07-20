import React, {Component, Fragment} from 'react';
import Explore from './Explore/Explore';
import AllCourses from './AllCourses/AllCourses';
import Header from '../Shared/Header';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          {/* <Header {...this.props} /> */}
          {/* <DeviceData /> */}
          <Explore />
          <AllCourses />
        </View>
      </Fragment>
    );
  }
}

export default Dashboard;
