import React, {useEffect, Fragment, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  useWindowDimensions,
  Text,
  ToastAndroid,
  BackHandler,
} from 'react-native';

import RenderHtml from 'react-native-render-html';
import {CheckBox, Icon} from 'react-native-elements';
import CountdownTimer from './Templates/CountdownTimer';
import {IconStyles} from '../../Styles';
import {submitExamScore} from '../../../store/actions/testSeries';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExamScreen = (props) => {
  const {examTime, name} = props.route.params.examData;
  const allQuestions = props.route.params.questions;
  // const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState({
    options: [],
    questionTitle: '<p>Question loading...</p>',
  });
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [maxIndex, setMaxIndex] = useState(0);
  const [user, setUser] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      title: name,
    });
    setCurrentQuestion(allQuestions[0]);
    setMaxIndex(allQuestions.length - 1);
    fetchUserData();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userId');
      setUser(userData);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const selectQuestionHandler = (value, qIndex) => {
    setVisible(false); //disable the question No. list
    setDisabled(true); //disable the blue button
    setIndex(qIndex); //set Index for question
    // setCurrentQuestionNumber(value.questionNumber); //set current question Number
    setCurrentQuestion(value); //set current question value
  };

  const {width} = useWindowDimensions();

  const selectOption = (value) => {
    if (isChecked !== '') {
      setIsChecked('');
      setDisabled(true);
      if (isChecked !== value._id) {
        setIsChecked(value._id);
        setSelectedOption(value);
        setDisabled(false);
      }
    } else {
      setDisabled(false);
      setSelectedOption(value);
      setIsChecked(value._id);
    }
  };

  //on time up
  const timeupHandler = (result = {}) => {
    props.navigation.navigate('Results', {allQuestions, result});
  };

  const nextQuestionHandler = async () => {
    allQuestions[index].answeredOption = selectedOption; //set the answer choosen by user

    //finishing exam
    if (index === maxIndex) {
      submitExamHandler();
    }

    await setIndex(index + 1); //set the index of next
    let temp = index + 1;
    if (allQuestions[temp] !== undefined)
      //select quetion state
      selectQuestionHandler(allQuestions[temp], temp);
    setIsChecked('');
  };

  const previousQuestionHandler = async () => {
    await setIndex(index - 1); //set the index of next
    let temp = index - 1;
    if (allQuestions[temp] !== undefined)
      //select quetion state
      selectQuestionHandler(allQuestions[temp], temp);
    setIsChecked('');
  };

  const submitExamHandler = async () => {
    ToastAndroid.show('Submiting your exam, please wait...', ToastAndroid.LONG);
    setTimeout(() => {
      let correct = 0;
      let attempted = 0;
      let wrong = 0;
      allQuestions.map((value) => {
        if (value?.answeredOption?.isCorrect === false) {
          const minusMarks = value?.marks * 0.5;
          wrong = parseFloat(wrong) + parseFloat(minusMarks);
        }
        if (value?.answeredOption?.isCorrect === true) {
          correct = parseInt(correct) + parseInt(value?.marks);
        }
        if (value?.answeredOption !== undefined) {
          attempted = parseInt(attempted) + 1;
        }
      });
      const net = parseInt(correct) - parseFloat(wrong);
      const finalMarks = net < 0 ? 0 : net;
      const body = {
        test: allQuestions[0]?.exam?._id,
        user,
        score: finalMarks,
      };

      submitExamScore(body);
      timeupHandler({attempted, correct: finalMarks, wrong});
      correct = 0;
      attempted = 0;
      wrong = 0;
    }, 600);
  };

  return (
    <Fragment>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
        }}>
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
            <Icon
              name="time-outline"
              type={IconStyles.iconType}
              size={20}
              containerStyle={{marginHorizontal: 10}}
            />

            <CountdownTimer
              onTimeupHandler={timeupHandler}
              timer={parseInt(examTime)}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            props.navigation.navigate('Report Question', {
              questionId: currentQuestion._id,
            })
          }
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon
            name="information-circle-outline"
            type={IconStyles.iconType}
            size={20}
            containerStyle={{marginHorizontal: 10}}
          />
          <Text>Report</Text>
        </TouchableOpacity>
      </View>

      {visible ? (
        <View style={{height: 50}}>
          <ScrollView horizontal={true}>
            {allQuestions.map((value, i) => {
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
            ? currentQuestion.options.map((value) => {
                return (
                  <View
                    key={value._id}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: '90%'}}>
                      <CheckBox
                        key={value._id}
                        title={value.optionTitle}
                        onPress={() => selectOption(value)}
                        checked={isChecked === value._id ? true : false}
                      />
                    </View>
                    <Text>
                      {currentQuestion?.answeredOption?._id === value._id ? (
                        <Icon
                          name="checkbox"
                          size={25}
                          color="rgba(20, 93, 160,0.6)"
                          type={IconStyles.iconType}
                        />
                      ) : null}
                    </Text>
                  </View>
                );
              })
            : null}
        </View>
      </ScrollView>

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
      </View>
    </Fragment>
  );
};

export default ExamScreen;
