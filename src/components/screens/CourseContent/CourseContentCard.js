import React, {Fragment} from 'react';
import {View, Text, StyleSheet, ScrollView, Linking} from 'react-native';
import PaidContentList from './PaidContentList';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../../Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CourseContentCard = (props) => {
  const videoClickEventHandler = (e, index) => {
    const body = {
      introVideoUrl: e.url,
      courseTitle: e.title,
    };

    props.activateVideo(body);
  };
  const onClickUrl = () => {
    Linking.openURL(props.content.otherUrl);
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

        <Fragment>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 1,
              backgroundColor: '#fff',
              right: 0,
              bottom: 0,
            }}>
            {/* <Text>Doubt Clearance</Text> */}
            <TouchableOpacity onPress={() => onClickUrl()}>
              <Icon
                size={25}
                raised
                type={IconStyles.iconType}
                color={'#000'}
                name="hand-left"
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <PaidContentList
              videoClickEventHandler={(e, i) => videoClickEventHandler(e, i)}
              data={props.content.content}
            />
            <View style={{marginVertical: 50}}></View>
          </ScrollView>
        </Fragment>
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
