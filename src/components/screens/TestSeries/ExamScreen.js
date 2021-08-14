import React, {useEffect, Fragment, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  useWindowDimensions,
  Text,
} from 'react-native';

import RenderHtml from 'react-native-render-html';
import {CheckBox, Icon} from 'react-native-elements';
import CountdownTimer from './CountdownTimer';
import {IconStyles} from '../../Styles';

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
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    props.navigation.setOptions({
      title: name,
    });
    setCurrentQuestion(allQuestions[0]);
    setMaxIndex(allQuestions.length - 1);
  }, []);

  const selectQuestionHandler = (value, qIndex) => {
    setVisible(false); //disable the question No. list
    setDisabled(true); //disable the blue button
    setIndex(qIndex); //set Index for question
    setCurrentQuestionNumber(value.questionNumber); //set current question Number
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
  const timeupHandler = () => {
    props.navigation.navigate('Results', allQuestions);
  };

  const nextQuestionHandler = async () => {
    allQuestions[index].answeredOption = selectedOption; //set the answer choosen by user

    if (index === maxIndex) timeupHandler();

    await setIndex(index + 1); //set the index of next
    let temp = index + 1;
    if (allQuestions[temp] !== undefined)
      //select quetion state
      selectQuestionHandler(allQuestions[temp], temp);
    setIsChecked('');
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
            backgroundColor:
              allQuestions[index]?.answeredOption !== undefined
                ? 'rgba(51, 183, 51,0.7)'
                : 'rgba(219, 108, 24,0.5)',
            borderColor: '#000',
          }}>
          <TouchableOpacity onPress={() => setVisible(!visible)}>
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
            {allQuestions.map((value, i) => {
              return (
                <TouchableOpacity
                  key={value._id}
                  onPress={() => selectQuestionHandler(value, i)}>
                  <Text
                    style={{
                      borderWidth: 1,
                      margin: 5,
                      padding: 10,
                      backgroundColor:
                        value?.answeredOption !== undefined
                          ? 'rgba(51, 183, 51,0.7)'
                          : 'rgba(219, 108, 24,0.5)',
                      borderColor: '#000',
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width:'90%'}}>
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
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => nextQuestionHandler()}
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
          <Text style={{color: '#fff', textAlign: 'center'}}>
            {index !== maxIndex ? 'Continue' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default ExamScreen;
