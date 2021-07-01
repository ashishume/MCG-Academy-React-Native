import React, {Fragment, useState} from 'react';
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {IconStyles} from '../../Styles';
import CommentSection from '../Comments/index';
const ContentList = ({data, videoClickEventHandler}) => {
  const clickVideoHandler = (value, i) => {
    if (value.urlType == 'video') videoClickEventHandler(value, i);
    else Linking.openURL(value.url);
  };

  const [visible, setVisible] = useState(false);
  const [videoData, setVideoData] = useState({});

  const toggleCommentSection = (props) => {
    setVideoData(props);
    setVisible(!visible);
  };
  return (
    <View style={styles.container}>
      <Divider />
      {visible ? (
        <Fragment>
          <CommentSection
            toggleCommentSection={toggleCommentSection}
            visible={visible}
            videoData={videoData}
          />
        </Fragment>
      ) : null}

      <Text style={styles.title}>Contents</Text>
      {data.map((value, i) => {
        return (
          <Fragment key={i}>
            <TouchableOpacity onPress={() => clickVideoHandler(value, i)}>
              <View style={styles.videoContainer}>
                <View style={{flex: 1}}>
                  <Text numberOfLines={1} style={{fontSize: 20}}>
                    {value.title}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => toggleCommentSection(value)}
                  style={{marginHorizontal: 20}}>
                  <Icon
                    size={25}
                    type={IconStyles.iconType}
                    color={'#000'}
                    name="chatbox"
                  />
                </TouchableOpacity>
                {value.urlType == 'video' ? (
                  <Icon
                    size={25}
                    type={IconStyles.iconType}
                    color={'#000'}
                    name="videocam-outline"
                  />
                ) : (
                  <Icon
                    size={20}
                    type={IconStyles.iconType}
                    color={'#000'}
                    name="link"
                  />
                )}
              </View>
              <Divider />
            </TouchableOpacity>
          </Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 20},
  title: {
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  videoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  true: {
    backgroundColor: 'red',
  },
});

export default ContentList;
