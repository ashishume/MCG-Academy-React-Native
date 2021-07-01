import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {connect} from 'react-redux';
import {Divider, Icon} from 'react-native-elements';
import {IconStyles} from '../../Styles';
import CommentSection from '../Comments/index';

const FreeVideosContent = (props) => {
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  const [videoData, setVideoData] = useState({});
  useEffect(() => {
    setContent(props.route.params);
    const body = {
      introVideoUrl: props.route.params.videoUrl,
      courseTitle: props.route.params.title,
    };
    props.activateVideo(body);
    return () => {
      const body = {
        introVideoUrl: '',
        courseTitle: '',
      };
      props.deActivateVideo(body);
    };
  }, []);
  const onClickUrl = (e) => {
    setVisible(true);
    setVideoData(e);
  };
  const toggleCommentSection = (props) => {
    setVisible(!visible);
  };
  return (
    <Fragment>
      {visible ? (
        <Fragment>
          <CommentSection
            toggleCommentSection={toggleCommentSection}
            visible={visible}
            videoData={videoData}
          />
        </Fragment>
      ) : null}
      <View style={styles.container}>
        <View>
          <Text style={styles.courseTitle}>{content.title}</Text>
        </View>
        <View style={styles.courseTypeContainer}>
          <Text style={styles.courseType}>{content.videoType}</Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={styles.author}>{content.author}</Text>
          <Text style={styles.category}>{content.category}</Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>
            Description
          </Text>
          <Divider />
          <Text style={styles.description}>{content.videoDescription}</Text>
          <Text style={styles.otherUrl}>
            <Icon
              onPress={() => onClickUrl(content)}
              size={25}
              raised
              type={IconStyles.iconType}
              color={'#000'}
              name="chatbox"
            />
          </Text>
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
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  author: {textAlign: 'center', fontSize: 20, fontWeight: 'normal'},
  courseType: {
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#ff8282',
    width: 150,
    alignSelf: 'center',
    fontSize: 17,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    textAlign: 'justify',
    fontSize: 20,
  },
  otherUrl: {
    textAlign: 'center',
  },
  category: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default connect('', {activateVideo, deActivateVideo})(FreeVideosContent);
