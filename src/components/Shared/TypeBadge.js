import React from 'react';
import {View, Text} from 'react-native';

const BadgeType = (props) => {
  return (
    <View
      style={{
        backgroundColor: '#fc8080',
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 20,
      }}>
      <Text numberOfLines={1} style={{color: '#fff', fontSize: 12}}>
        {props.name}
      </Text>
    </View>
  );
};

export default BadgeType;
