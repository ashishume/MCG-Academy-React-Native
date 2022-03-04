import {View, Text, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';

const QuestionPicker = ({selectedLanguageQuestions, setVisible, visible, index}) => {
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
            selectedLanguageQuestions[index]?.answeredOption !== undefined
              ? '#195de5' //answered
              : '#d6e3ff',  //not answered
        }}
        onPress={() => setVisible(!visible)}>
        <Text style={{textAlign: 'center', fontSize: 17, fontWeight: 'bold'}}>
          {index + 1}/{selectedLanguageQuestions.length}
        </Text>
      </TouchableOpacity>
    </Fragment>
  );
};

export default QuestionPicker;
