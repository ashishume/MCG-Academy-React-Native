import React, {Fragment, useState} from 'react';
import {TextInput} from 'react-native';
import {View, Text, Button, TouchableOpacity, ScrollView} from 'react-native';
import database from '@react-native-firebase/database';

const CommentSection = () => {
  const [comments, setComments] = useState('');
  const [userComments, setUserComments] = useState([]);
  let i = 1;
  const setCommentData = (e) => {
    setComments({id: Math.random(0, 1000000000000) * 100000, data: e});
  };

  const onCommentSubmitHandler = () => {
    database()
      .ref('/users/123')
      .set({
        name: 'Ada Lovelace',
        age: 31,
      })
      .then(() => console.log('Data set.'));
  };
  return (
    <Fragment>
      <View style={{flex: 1}}>
        <ScrollView>
          {commentsDataJson.map((value) => {
            return (
              <Text
                key={value.id}
                style={{
                  padding: 10,
                  textAlign: 'left',
                  width: '100%',
                  marginHorizontal: 10,
                }}>
                {value.data}
              </Text>
            );
          })}
        </ScrollView>
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <TextInput
          onChangeText={(data) => setCommentData(data)}
          style={{
            color: '#000',
            borderWidth: 1,
            fontSize: 15,
            flex: 6,
            width: '100%',
            paddingLeft: 10,
            borderBottomColor: '#000',
          }}
          placeholder="Enter comments"
          placeholderTextColor="#000"
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#3684e2',
            width: '100%',
            height: 50,
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <Text onPress={onCommentSubmitHandler} style={{color: '#fff'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default CommentSection;
