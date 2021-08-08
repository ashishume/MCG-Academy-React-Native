import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

const ExamListTemplate = (props) => {
  const {
    category,
    _id,
    examImageUrl,
    examTime,
    instructions,
    isPaid,
    name,
    price,
    timeLimit,
  } = props.data;
  return (
    <TouchableOpacity
      onPress={() => props.routeToDescription(name, instructions)}
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
      <View style={{flexDirection: 'row'}}>
        <Text numberOfLines={1} style={{paddingRight: 10}}>
          {examTime} mins,
        </Text>
        <Text numberOfLines={1} style={{paddingRight: 10}}>
          Valid for {timeLimit} days
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          props.makeTestSeriesPayment(_id, price, timeLimit, name)
        }
        style={{
          backgroundColor: '#c20202',
          height: 40,
          marginVertical: 10,
          flex: 1,
          justifyContent: 'center',
          borderRadius: 20,
          width: '100%',
        }}>
        {isPaid ? (
          <Text style={{color: '#fff', textAlign: 'center'}}>
            Buy for ₹{price}
          </Text>
        ) : (
          <Text style={{color: '#fff', textAlign: 'center'}}>Enroll free</Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ExamListTemplate;
