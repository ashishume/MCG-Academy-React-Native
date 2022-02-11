import {View, Text, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';

const QuestionPicker = ({allQuestions, setVisible, visible, index}) => {
  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderRadius: 8,
          marginLeft: 5,
          borderColor:
            allQuestions[index]?.answeredOption !== undefined
              ? 'rgba(51, 183, 51,0.7)'
              : 'rgba(219, 108, 24,0.5)',
        }}
        onPress={() => setVisible(!visible)}>
        <Text style={{textAlign: 'center', fontSize: 17, fontWeight: 'bold'}}>
          {index + 1}/{allQuestions.length}
        </Text>
      </TouchableOpacity>
    </Fragment>
  );
};

export default QuestionPicker;
