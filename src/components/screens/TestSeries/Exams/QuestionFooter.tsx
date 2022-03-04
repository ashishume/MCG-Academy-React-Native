import {View, Text, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import Report from '../Report';

const QuestionFooter = ({
  currentQuestion,
  previousQuestionHandler,
  clearSelectedOption,
  nextQuestionHandler,
  disabled,
  maxIndex,
  modelVisible,
  setModalVisible,
  examData,
  index,
}) => {
  return (
    <Fragment>
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => previousQuestionHandler()}
          disabled={index === 0}
          style={{
            flex: 1,
            marginHorizontal: 5,
            backgroundColor:
              index !== 0 ? 'rgb(31, 81, 221)' : 'rgb(150, 150, 150)',
            height: 40,
            justifyContent: 'center',
            borderRadius: 20,
            width: '100%',
          }}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Previous</Text>
        </TouchableOpacity>
        {currentQuestion?.answeredOption !== undefined ? (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={currentQuestion?.answeredOption === undefined}
            onPress={() => clearSelectedOption()}
            style={{
              flex: 1,
              marginHorizontal: 5,
              backgroundColor:
                currentQuestion?.answeredOption !== undefined
                  ? 'rgb(31, 81, 221)'
                  : 'rgb(150, 150, 150)',
              height: 40,
              justifyContent: 'center',
              borderRadius: 20,
              width: '100%',
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Clear & Next
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => nextQuestionHandler()}
          disabled={disabled}
          style={{
            flex: 1,
            marginHorizontal: 5,
            backgroundColor: !disabled
              ? 'rgb(31, 81, 221)'
              : 'rgb(150, 150, 150)',
            height: 40,
            justifyContent: 'center',
            borderRadius: 20,
            width: '100%',
          }}>
          <Text style={{color: '#fff', textAlign: 'center'}}>
            {index !== maxIndex ? 'Save & Next' : 'Finish'}
          </Text>
        </TouchableOpacity>

        <Report
          visible={modelVisible}
          questionId={currentQuestion._id}
          reportData={examData}
          closeModal={() => setModalVisible(false)}
        />
      </View>
    </Fragment>
  );
};

export default QuestionFooter;
