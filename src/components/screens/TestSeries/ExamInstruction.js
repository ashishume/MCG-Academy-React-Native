import React from 'react';
import {View, Text} from 'react-native';

const ExamInstruction = (props) => {
  const {name, desc} = props.route.params;
  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>
        {name}
      </Text>
      <Text
        style={{
          textAlign: 'justify',
          marginHorizontal: 10,
          fontSize: 15,
          marginTop: 10,
        }}>
        {desc}
      </Text>
    </View>
  );
};

export default ExamInstruction;
