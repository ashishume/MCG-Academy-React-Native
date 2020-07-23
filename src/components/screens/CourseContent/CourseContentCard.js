import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PaidContentList from './PaidContentList';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {connect} from 'react-redux';

const CourseContentCard = (props) => {
  const videoClickEventHandler = (e, index) => {
    const body = {
      introVideoUrl: e.url,
      courseTitle: e.title,
    };

    props.activateVideo(body);
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <View>
          <Text style={styles.courseTitle}>{props.content.courseTitle}</Text>
        </View>
        <View style={styles.courseTypeContainer}>
          <Text style={styles.courseType}>{props.content.courseType}</Text>
        </View>

        <View>
          <PaidContentList
            videoClickEventHandler={(e, i) => videoClickEventHandler(e, i)}
            data={props.content.content}
          />
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  courseTitle: {
    textAlign: 'left',
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  author: {textAlign: 'left', fontSize: 15, fontWeight: 'normal'},
  courseType: {
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#ff8282',
    width: 150,
    fontSize: 17,
    borderRadius: 10,
    fontWeight: 'bold',
  },
});
export default connect('', {activateVideo, deActivateVideo})(CourseContentCard);
