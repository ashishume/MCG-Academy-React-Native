import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  useWindowDimensions,
  Text,
} from 'react-native';

import RenderHtml from 'react-native-render-html';
import {CheckBox} from 'react-native-elements';
const ExamScreen = (props) => {
  const {examTime, name, timeLimit, _id} = props.route.params.examData;
  const allQuestions = props.route.params.questions;
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState({
    options: [],
    questionTitle: '<p>Question loading...</p>',
  });
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    props.navigation.setOptions({
      title: name,
    });

    setCurrentQuestion(allQuestions[0]);
  }, []);

  const selectQuestionNumber = () => {
    setVisible(!visible);
  };

  const selectQuestionHandler = (value) => {
    setVisible(false);
    setCurrentQuestionNumber(value.questionNumber);
    setCurrentQuestion(value);
  };
  const {width} = useWindowDimensions();

  const selectOption = (value) => {
    if (isChecked !== '') {
      setIsChecked('');
      setDisabled(true);
      if (isChecked !== value._id) {
        setIsChecked(value._id);
        setDisabled(false);
      }
    } else {
      setDisabled(false);
      setIsChecked(value._id);
    }
  };
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#000',
          }}>
          <TouchableOpacity onPress={() => selectQuestionNumber()}>
            <Text
              style={{textAlign: 'center', fontSize: 17, fontWeight: 'bold'}}>
              Question {currentQuestionNumber}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </View>
      {visible ? (
        <ScrollView horizontal={true}>
          {allQuestions.map((value) => {
            return (
              <TouchableOpacity
                key={value._id}
                onPress={() => selectQuestionHandler(value)}>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: '#000',
                    margin: 5,
                    padding: 10,
                  }}>
                  {value.questionNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : null}
      <View style={{margin: 5}}>
        <RenderHtml
          contentWidth={width}
          source={{
            html: currentQuestion.questionTitle,
          }}
        />
      </View>
      <View style={{marginTop: 20}}>
        {currentQuestion.options.length !== 0
          ? currentQuestion.options.map((value, index) => {
              return (
                <CheckBox
                  key={value._id}
                  title={value.optionTitle}
                  onPress={() => selectOption(value)}
                  checked={isChecked === value._id ? true : false}
                />
              );
            })
          : null}
      </View>
      <View style={{marginTop: 5, marginHorizontal: 10}}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={true}
          style={{
            backgroundColor: !disabled
              ? 'rgb(31, 81, 221)'
              : 'rgb(150, 150, 150)',
            height: 40,
            justifyContent: 'center',
            borderRadius: 20,
            width: '100%',
          }}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExamScreen;
