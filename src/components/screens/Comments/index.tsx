import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import database, {firebase} from '@react-native-firebase/database';
import {IconStyles} from '../../Styles';
import Chatbox from './Chatbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
const CommentSection = ({videoData}) => {
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const onValueChange = database()
      .ref(`/comments/${videoData._id}`)
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          let tempArray = [];
          snapshot.forEach((v) => {
            tempArray.push({_id: v.key, ...v.val()});
          });
          setCommentData(tempArray.reverse());
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
    let date = firebase.database.ServerValue.TIMESTAMP;
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
    if (v.trim().length) setDisabled(false);
    else setDisabled(true);
  };

  const commentDeleteHandler = (props) => {
    database().ref(`/comments/${props.videoId}`).child(props._id).remove();
  };
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={
            <Text style={styles.emptyComments}>No comments available</Text>
          }
          keyExtractor={(item, i) => i.toString()}
          renderItem={(item) => {
            return (
              <View style={styles.renderItem}>
                <Chatbox
                  commentDeleteHandler={() => commentDeleteHandler(item.item)}
                  value={item.item}
                />
              </View>
            );
          }}
          data={commentData}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          multiline={true}
          placeholder="Enter Comment"
          value={comment}
          onSubmitEditing={onCommentSubmitHandler}
          onChangeText={(e) => onCommentHandler(e)}
          style={styles.inputTextField}
          placeholderTextColor="rgba(0,0,0,0.3)"
        />
        <TouchableOpacity
          style={{flex: 1}}
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
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingBottom: '20%',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  renderItem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  inputTextField: {
    color: '#000',
    borderWidth: 1,
    flex: 4,
    fontSize: 15,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  emptyComments: {textAlign: 'center', marginTop: 10},
});

export default CommentSection;
