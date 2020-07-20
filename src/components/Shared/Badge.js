import React from 'react';
import { View, Text } from 'react-native';

const BadgeType = props => {
  return (
    <View
      style={{
        backgroundColor: '#6b42e5',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: 24,
      }}>
      <Text style={{color: '#fff'}}>{props.name}</Text>
    </View>
  );
};

export default BadgeType;
