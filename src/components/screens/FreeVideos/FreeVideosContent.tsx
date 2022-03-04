import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {useDispatch} from 'react-redux';
import {Divider, Icon} from 'react-native-elements';
import {IconStyles} from '../../Styles';
import CommentSection from '../Comments/index';
import useDidMount from '../../Utils/didMount';
import HttpService from '../../../API/HttpService';
import {API_NAME} from '../../../API/ApiPaths';
import {onShareHandler} from '../../Utils/ShareInfo';

const FreeVideosContent = (props) => {
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  const [videoData, setVideoData] = useState({});

  const dispatch = useDispatch();
  const didMount = useDidMount(true);

  useEffect(() => {
    if (didMount) {
      (async () => {
        try {
          const response = await HttpService.get(
            API_NAME.VIDEOS_BY_ID + '/' + props.route.params.videoId,
          );
          await setContent(response.data);
          const {videoUrl, title} = response.data;
          const body = {
            introVideoUrl: videoUrl,
            courseTitle: title,
          };
          dispatch(activateVideo(body));
        } catch (e) {
          console.log('Free video could not be fetched');
        }
      })();
    }
    return () => {
      const body = {
        introVideoUrl: '',
        courseTitle: '',
      };
      dispatch(deActivateVideo(body));
    };
  }, [props.route.params.videoId]);
  const toggleCommentSection = (e) => {
    setVisible(true);
    setVideoData(e);
  };
  const onClickUrl = (e) => {
    Linking.openURL(e.otherUrl);
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
          <View style={styles.otherUrl}>
            <Icon
              onPress={() => toggleCommentSection(content)}
              size={25}
              raised
              type={IconStyles.iconType}
              color={'#000'}
              name="chatbox"
            />
            <Icon
              onPress={() => onClickUrl(content)}
              size={25}
              raised
              type={IconStyles.iconType}
              color={'#000'}
              name="file-tray"
            />
            <Icon
              onPress={() =>
                onShareHandler(
                  content?.title,
                  content?.videoImage,
                  'videos',
                  content?._id,
                )
              }
              size={25}
              raised
              type={IconStyles.iconType}
              color={'#000'}
              name="share-social"
            />
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  category: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default FreeVideosContent;
