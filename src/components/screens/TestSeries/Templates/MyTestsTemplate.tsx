import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

const MyTestsTemplate = (props) => {
  const {expiryDate, amount} = props.data;
  const {
    category,
    createdAt,
    examImageUrl,
    examTime,
    instructions,
    isDeleted,
    isPaid,
    name,
    price,
    timeLimit,
  } = props.data.test;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.3)',
        padding: 5,
        margin: 5,
      }}>
      <Image
        source={{uri: examImageUrl}}
        style={{width: '100%', height: 170}}
      />
      <Text
        numberOfLines={1}
        style={{paddingTop: 3, fontSize: 15, fontWeight: 'bold'}}>
        {name}
      </Text>
      <View style={{flexDirection: 'column'}}>
        <Text numberOfLines={1} style={{paddingRight: 10}}>
          {examTime} mins,
        </Text>
        <Text numberOfLines={1} style={{paddingRight: 10}}>
          Valid upto, {new Date(expiryDate).toDateString()},
        </Text>
        <Text numberOfLines={1} style={{paddingRight: 10}}>
          Amount paid, ₹ {amount}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.continueToTest(props.data)}
        style={{
          backgroundColor: 'green',
          height: 40,
          marginVertical: 10,
          flex: 1,
          justifyContent: 'center',
          borderRadius: 20,
          width: '100%',
        }}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Continue test</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MyTestsTemplate;
