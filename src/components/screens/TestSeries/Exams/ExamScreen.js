import React, {useEffect, Fragment, useState} from 'react';
import {
  View,
  useWindowDimensions,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {submitExamScore} from '../../../../store/actions/testSeries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionPicker from './QuestionPicker';
import CountownTimerComponent from './CountownTimer';
import ReportComponent from './ReportComponent';
import QuestionListNumberPicker from './QuestionListNumberPicker';
import ExamBody from './ExamBody';
import QuestionFooter from './QuestionFooter';

const ExamScreen = (props) => {
  const {examTime, name, questionMarks} = props.route.params.examData;
  const allQuestions = props.route.params.questions;

  const hindiQuestions = props.route.params.questions.filter(
    (value) => value?.language === 'hi',
  );
  const englishQuestions = props.route.params.questions.filter(
    (value) => value?.language === 'en',
  );

  let selectedLanguageQuestions = englishQuestions;
  // console.log(hindiQuestions, englishQuestions);

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
  const [modelVisible, setModalVisible] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      title: name,
    });
    setCurrentQuestion(selectedLanguageQuestions[0]);
    setMaxIndex(selectedLanguageQuestions.length - 1);
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
    props.navigation.navigate('Results', {selectedLanguageQuestions, result});
  };

  const nextQuestionHandler = async () => {
    selectedLanguageQuestions[index].answeredOption = selectedOption; //set the answer choosen by user

    //finishing exam
    if (index === maxIndex) {
      submitExamHandler();
    }

    await setIndex(index + 1); //set the index of next
    let temp = index + 1;
    if (selectedLanguageQuestions[temp] !== undefined)
      //select quetion state
      selectQuestionHandler(selectedLanguageQuestions[temp], temp);
    setIsChecked('');
  };

  const previousQuestionHandler = async () => {
    await setIndex(index - 1); //set the index of next
    let temp = index - 1;
    if (selectedLanguageQuestions[temp] !== undefined)
      //select quetion state
      selectQuestionHandler(selectedLanguageQuestions[temp], temp);
    setIsChecked('');
  };

  const submitExamHandler = async () => {
    ToastAndroid.show('Submiting your exam, please wait...', ToastAndroid.LONG);
    setTimeout(() => {
      let correct = 0;
      let attempted = 0;
      let wrong = 0;
      selectedLanguageQuestions.map((value) => {
        //if wrong answer
        if (value?.answeredOption?.isCorrect === false) {
          const minusMarks = questionMarks * 0.5;
          wrong = parseFloat(wrong) + parseFloat(minusMarks);
        }
        //if correct answer
        if (value?.answeredOption?.isCorrect === true) {
          correct = parseInt(correct) + parseInt(questionMarks);
        }
        //if not attempted
        if (value?.answeredOption !== undefined) {
          attempted = parseInt(attempted) + 1;
        }
      });
      const net = parseInt(correct) - parseFloat(wrong);
      const finalMarks = net < 0 ? 0 : net;
      const body = {
        test: selectedLanguageQuestions[0]?.exam?._id,
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
  const clearSelectedOption = async () => {
    delete selectedLanguageQuestions[index].answeredOption;
    setIndex(index + 1);
  };

  const changeLanguageHandler = (currentLanguage, questionNumber) => {
    const alternateQuestion = allQuestions.filter(
      (value) =>
        value.language !== currentLanguage &&
        value.questionNumber === questionNumber,
    );

    if (currentLanguage === 'en') selectedLanguageQuestions = hindiQuestions;
    else selectedLanguageQuestions = englishQuestions;

    if (alternateQuestion?.length) {
      setCurrentQuestion(alternateQuestion[0]);
    } else {
      ToastAndroid.show('Other language is not available', ToastAndroid.LONG);
    }
  };

  return (
    <Fragment>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
        }}>
        {/* Question picker  */}
        <QuestionPicker
          selectedLanguageQuestions={selectedLanguageQuestions}
          setVisible={setVisible}
          visible={visible}
          index={index}
        />

        {/* Countown timer */}
        <CountownTimerComponent
          timeupHandler={timeupHandler}
          examTime={examTime}
        />

        {/* Report button  */}
        <ReportComponent setModalVisible={setModalVisible} />
      </View>

      {/* question picker list */}
      {visible ? (
        <QuestionListNumberPicker
          selectedLanguageQuestions={selectedLanguageQuestions}
          selectQuestionHandler={selectQuestionHandler}
        />
      ) : null}

      {/* Current question and options  */}
      <ExamBody
        currentQuestion={currentQuestion}
        selectOption={selectOption}
        isChecked={isChecked}
        width={width}
        changeLanguageHandler={changeLanguageHandler}
      />

      {/* Next/Clear/Previous buttons */}
      <QuestionFooter
        currentQuestion={currentQuestion}
        previousQuestionHandler={previousQuestionHandler}
        clearSelectedOption={clearSelectedOption}
        nextQuestionHandler={nextQuestionHandler}
        disabled={disabled}
        maxIndex={maxIndex}
        modelVisible={modelVisible}
        setModalVisible={setModalVisible}
        examData={props.route.params.examData}
        index={index}
      />
    </Fragment>
  );
};

export default ExamScreen;
