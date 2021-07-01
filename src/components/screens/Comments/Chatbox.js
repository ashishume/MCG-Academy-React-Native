import React from 'react';
import {View, Text, ToastAndroid, TouchableOpacity} from 'react-native';
import Styles from '../../Styles';
import Clipboard from '@react-native-community/clipboard';

const CommentCopied = (value) => {
  Clipboard.setString(value);
  ToastAndroid.show('Comment Copied', ToastAndroid.LONG);
};
const Chatbox = ({value}) => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        margin: 5,
        padding: 10,
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'rgba(52, 79, 237,0.08)',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          numberOfLines={1}
          style={{
            ...Styles.fontFamily,
            fontWeight: '700',
            fontSize: 17,
            flex: 1,
          }}>
          {value.userName}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            padding: 0,
            margin: 0,
          }}>
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

export default Chatbox;
