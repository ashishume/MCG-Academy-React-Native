import React, {Component, Fragment} from 'react';
import Explore from './Explore/Explore';
import AllCourses from './AllCourses/AllCourses';
import TopHeader from '../Shared/Header';
import {View, ToastAndroid} from 'react-native';
import {fetchMyCourseIds} from '../../store/actions/courses';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

class Dashboard extends Component {
  onClickHandler = () => {
    this.props.navigation.navigate('Profile');
  };

  async componentDidMount() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await this.props.fetchMyCourseIds(userId);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  }
  render() {
    return (
      <Fragment>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <TopHeader
            {...this.props}
            IconName="ios-person"
            onIconClick={() => this.onClickHandler()}
          />
          <Explore {...this.props} />
          <AllCourses {...this.props} />
        </View>
      </Fragment>
    );
  }
}

export default connect('', {fetchMyCourseIds})(Dashboard);
