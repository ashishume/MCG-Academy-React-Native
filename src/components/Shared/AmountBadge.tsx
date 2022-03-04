import React from 'react';
import {View, Text} from 'react-native';

const AmountBadge = props => {
  return (
    <View
      style={{
        backgroundColor: props.color,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: 24,
        width: 80,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        ₹{props.name}
      </Text>
    </View>
  );
};

export default AmountBadge;
