import {View, Text} from 'react-native';
import React, {Fragment} from 'react';
const fontStyle = {fontSize: 20, textAlign: 'left', fontWeight: 'bold'};

const Scores = ({result}) => {
  return (
    <Fragment>
      <View
        style={{
          marginVertical: 5,
          paddingVertical: 5,
        }}>
        <Text style={{fontSize: 25, marginBottom: 10}}>Your results</Text>
        <Text style={fontStyle}>Attempted Questions: {result?.attempted}</Text>
        <Text style={fontStyle}>Your score: {result?.correct}</Text>
      </View>
    </Fragment>
  );
};

export default Scores;
