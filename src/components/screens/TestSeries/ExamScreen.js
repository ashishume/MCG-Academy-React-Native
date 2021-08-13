import React, {useEffect, Fragment, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  useWindowDimensions,
  Text,
} from 'react-native';

import RenderHtml from 'react-native-render-html';
import {CheckBox} from 'react-native-elements';
import CountdownTimer from './CountdownTimer';

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
  const [maxQuestionNumber, setmaxQuestionNumber] = useState(0);
  
  /*
  TODO: Set index of curr question and use it get the next array question element
        this will remove the dependcy of question No.
  */
  
  // const [index, setIndex] = useState(0);

  useEffect(() => {
    props.navigation.setOptions({
      title: name,
    });
    setCurrentQuestion(allQuestions[0]);
    findMaxQuestionNumber(allQuestions);
  }, []);

  const findMaxQuestionNumber = (questionArray) => {
    const maxNo = Math.max.apply(
      Math,
      questionArray.map(function (o) {
        return o.questionNumber;
      }),
    );
    setmaxQuestionNumber(maxNo);
  };
  const selectQuestionNumber = () => {
    setVisible(!visible);
  };

  const selectQuestionHandler = (value) => {
    setVisible(false);
    setDisabled(true);
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

  //on time up
  const timeupHandler = () => {
    props.navigation.navigate('Results', allQuestions);
  };

  const nextQuestionHandler = (currQNumber) => {
    const nextQNumber = currQNumber + 1;
    const filtered = allQuestions.filter(
      (value) => value.questionNumber === nextQNumber,
    );
    if (filtered.length !== 0) selectQuestionHandler(filtered[0]);
  };

  return (
    <Fragment>
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
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18}}>Time left: </Text>
            <CountdownTimer
              onTimeupHandler={timeupHandler}
              timer={parseInt(examTime)}
            />
          </View>
        </View>
      </View>
      {visible ? (
        <View style={{height: 50}}>
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
        </View>
      ) : null}

      <ScrollView>
        <View style={{margin: 5}}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: currentQuestion.questionTitle,
            }}
          />
        </View>
        <View style={{paddingVertical: 20}}>
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
      </ScrollView>
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => nextQuestionHandler(currentQuestionNumber)}
          disabled={disabled}
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
    </Fragment>
  );
};

export default ExamScreen;
