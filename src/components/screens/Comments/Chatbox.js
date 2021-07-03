import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Styles from '../../Styles';
import Clipboard from '@react-native-community/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../../Styles';
const CommentCopied = (value) => {
  Clipboard.setString(value);
  ToastAndroid.show('Comment Copied', ToastAndroid.LONG);
};
const Chatbox = ({value, commentDeleteHandler}) => {
  const [userType, setUserType] = useState(0);
  const [userId, setUserId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTypeData = await AsyncStorage.getItem('userType');
        setUserType(userTypeData);
        const userIdData = await AsyncStorage.getItem('userId');
        setUserId(userIdData);
      } catch (e) {
        ToastAndroid.show('Something went Wrong', ToastAndroid.LONG);
      }
    };

    fetchData();
  });
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text numberOfLines={1} style={styles.userName}>
          {value.userName}
        </Text>
        {userType === '1' || userId === value.userId ? (
          <Text numberOfLines={1} style={styles.deleteIcon}>
            <Icon
              name="trash-bin"
              size={15}
              raised
              onPress={commentDeleteHandler}
              color="#000"
              type={IconStyles.iconType}
            />
          </Text>
        ) : null}
      </View>
      <View style={styles.commentData}>
        <Text numberOfLines={1} style={styles.createdDate}>
          {value.createdAt}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.3}
        onLongPress={() => CommentCopied(value.comment)}>
        <Text style={{fontSize: 15}}>{value.comment}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    margin: 5,
    padding: 10,
    height: '100%',
    borderRadius: 10,
    backgroundColor: 'rgba(52, 79, 237,0.08)',
  },
  innerContainer: {flexDirection: 'row', alignItems: 'center'},
  userName: {
    ...Styles.fontFamily,
    fontWeight: '700',
    fontSize: 17,
    flex: 1,
  },
  deleteIcon: {
    fontSize: 12,
    padding: 0,
    margin: 0,
  },
  commentData: {flexDirection: 'row', alignItems: 'flex-start'},
  createdDate: {
    fontSize: 12,
    padding: 0,
    margin: 0,
  },
});

export default Chatbox;
