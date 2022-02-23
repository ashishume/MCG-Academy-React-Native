import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';

const QuestionListNumberPicker = ({
  selectedLanguageQuestions,
  selectQuestionHandler,
}) => {
  return (
    <Fragment>
      <View style={{height: 50}}>
        <ScrollView horizontal={true}>
          {selectedLanguageQuestions.map((value, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={value._id}
                onPress={() => selectQuestionHandler(value, i)}>
                <Text
                  style={{
                    margin: 5,
                    textAlign: 'center',
                    width: 50,
                    height: 35,
                    paddingTop: 7,
                    borderRadius: 10,
                    backgroundColor:
                      value?.answeredOption !== undefined
                        ? '#195de5' //answered
                        : '#d6e3ff', // not answered
                    color:
                      value?.answeredOption !== undefined ? '#fff' : '#000',
                  }}>
                  {value.questionNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default QuestionListNumberPicker;
