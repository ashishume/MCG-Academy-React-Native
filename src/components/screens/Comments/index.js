import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import {Icon} from 'react-native-elements';
import database from '@react-native-firebase/database';
import Styles, {IconStyles} from '../../Styles';
import Chatbox from './Chatbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CommentSection = ({videoData, visible, toggleCommentSection}) => {
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const onValueChange = database()
      .ref(`/comments/${videoData._id}`)
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          const commentItem = snapshot.val();
          let commentsArray = Object.values(commentItem);
          setCommentData(commentsArray);
        } else {
          setCommentData([]);
        }
      });
    return () =>
      database().ref(`/comments/${videoData._id}`).off('value', onValueChange);
  }, [videoData._id]);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userName = await AsyncStorage.getItem('name');
      return {
        userId: userId,
        userName: userName,
      };
    } catch (err) {
      ToastAndroid.show('Something went Wrong', ToastAndroid.LONG);
    }
  };

  const onCommentSubmitHandler = () => {
    let date = new Date().toDateString();
    fetchUserData().then((userData) => {
      const commentObj = {
        ...userData,
        comment,
        createdAt: date,
        videoId: videoData._id,
      };
      const valueCh = database()
        .ref(`/comments/${videoData._id}`)
        .push(commentObj)
        .then(() => {
          setComment('');
          setDisabled(true);
        });

      return () =>
        database().ref(`/comments/${videoData._id}`).off('value', valueCh);
    });
  };

  const onCommentHandler = (v) => {
    setComment(v);
    if (v.length) setDisabled(false);
    else setDisabled(true);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={toggleCommentSection}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="arrow-back"
              raised
              size={20}
              onPress={toggleCommentSection}
              color="#000"
              type={IconStyles.iconType}
            />
            <Text style={{fontWeight: '700', ...Styles.fontFamily}}>
              {videoData.title}
            </Text>
          </View>

          <ScrollView
            style={{
              width: '100%',
            }}>
            {commentData.length ? (
              commentData.map((item, i) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}
                    key={i}>
                    <Chatbox value={item} />
                  </View>
                );
              })
            ) : (
              <Text style={{textAlign: 'center'}}>No comments available</Text>
            )}
          </ScrollView>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 4}}>
            <TextInput
              placeholder="Enter Comment"
              value={comment}
              onChangeText={(e) => onCommentHandler(e)}
              style={{
                color: '#000',
                borderWidth: 1,
                fontSize: 15,
                paddingLeft: 10,
                margin: 10,
                borderRadius: 10,
                borderColor: 'rgba(0,0,0,0.3)',
              }}
              placeholderTextColor="rgba(0,0,0,0.3)"
            />
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!comment.length}
              onPress={onCommentSubmitHandler}>
              <Icon
                size={24}
                disabled={disabled}
                type={IconStyles.iconType}
                color={'blue'}
                reverse={true}
                name="play"
                raised={true}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CommentSection;
