import React, {Component, Fragment} from 'react';
import Explore from './Explore/Explore';
import AllCourses from './AllCourses/AllCourses';
import TopHeader from '../Shared/Header';
import {View} from 'react-native';
import {connect} from 'react-redux';
// import {deActivateVideo} from '../../store/actions/video';
class Dashboard extends Component {
  onClickHandler = () => {
    this.props.navigation.navigate('Profile');
  };
  // componentDidMount() {
  //   // this.props.deActivateVideo();
  // }
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

export default Dashboard;
