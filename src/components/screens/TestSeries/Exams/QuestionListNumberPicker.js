import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';

const QuestionListNumberPicker = ({selectedLanguageQuestions, selectQuestionHandler}) => {
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
                    borderWidth: 1,
                    margin: 5,
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor:
                      value?.answeredOption !== undefined
                        ? 'rgba(51, 183, 51,0.7)'
                        : 'rgba(219, 108, 24,0.5)',
                    borderColor:
                      value?.answeredOption !== undefined
                        ? 'rgba(51, 183, 51,0.7)'
                        : 'rgba(219, 108, 24,0.5)',
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
