import React, {Component} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import TopHeader from '../../Shared/Header';
import CourseCard from '../../Shared/CourseCard';
import data from '../../../assets/data.json';

class MyCourses extends Component {
  renderData = () => {
    return data.map((value, i) => {
      return (
        <CourseCard
          key={i}
          type={value.type}
          thumbail={value.image}
          author={value.author}
          title={value.text}
        />
      );
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <TopHeader name="My Courses" />
        <SafeAreaView
          style={{flex: 1, backgroundColor: '#fff', paddingBottom: 10}}>
          <ScrollView style={{flex: 1}}>{this.renderData()}</ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default MyCourses;

