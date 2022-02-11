import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchAllQuestions} from '../../../store/actions/testSeries';
import {IconStyles} from '../../Styles';
import RenderHtml from 'react-native-render-html';
import {SUPPORTED_LANGUAGES} from '../../Utils/Language';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExamInstruction = (props) => {
  const {width} = useWindowDimensions();
  const {data} = props.route.params;

  const [visible, setVisible] = useState(false);

  const routeToExamScreen = () => {
    if (props?.testQuestions?.length) {
      props.navigation.navigate('ExamScreen', {
        examData: data,
        questions: props.testQuestions,
      });
    } else {
      ToastAndroid.show('No questions available', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllQuestions(data._id);
      await setDefaultLanguage(SUPPORTED_LANGUAGES.English);
    };
    fetchData();
  }, []);

  const setDefaultLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('language', lang);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };
  const setLanguage = async (lang) => {
    await setVisible(!visible);
    await setDefaultLanguage(lang);
  };
  return (
    <View style={{flex: 1, marginBottom: 10}}>
      {/* Header  navbar */}
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
          paddingLeft: 20,
        }}>
        <Icon
          containerStyle={{paddingRight: 10, flex: 1}}
          onPress={() => props.navigation.goBack()}
          name="arrow-back-outline"
          type={IconStyles.iconType}
          color="#000"
        />
        <Text style={{fontSize: 18, flex: 10}}>Instruction</Text>
        <Icon
          containerStyle={{
            flex: 1,
            flexBasis: 50,
          }}
          onPress={() => setVisible(!visible)}
          name="language-outline"
          type={IconStyles.iconType}
          color="#000"
        />
      </View>
      {visible ? (
        <View
          style={{
            width: '50%',
            position: 'absolute',
            left: 208,
            top: 52,
            shadowColor: '#000',
            backgroundColor: '#fff',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 8,
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 10,
            zIndex: 1,
          }}>
          {Object.keys(SUPPORTED_LANGUAGES).map((value) => {
            return (
              <Text
                key={value}
                onPress={() => setLanguage(SUPPORTED_LANGUAGES[value])}
                style={{
                  fontSize: 17,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  width: '100%',
                  textAlign: 'center',
                }}>
                {value}
              </Text>
            );
          })}
        </View>
      ) : null}

      <ScrollView style={{margin: 10}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>{data.name}</Text>
        <View
          style={{
            textAlign: 'left',
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: data.instructions,
            }}
          />
        </View>
        <View
          style={{
            borderTopColor: '#000',
            borderTopWidth: 1,
            marginTop: 5,
          }}>
          <Text style={styles.topScreen}>Navigating to a question: </Text>
          <Text style={styles.topScreen}>
            To select a question to answer, you can do one of the following:
          </Text>
          <Text style={styles.topScreen}>
            1. Click on the question number on the question palette at the top
            left of your screen to go to that numbered question directly. Note
            that using this option does NOT save your answer to the current
            question.
          </Text>
          <Text style={styles.topScreen}>
            2 Click on Save and Next to save answer to current question and to
            go to the next question in sequence.
          </Text>

          <Text style={styles.topScreen}>Answering questions:</Text>
          <Text style={styles.topScreen}>
            1. To select your answer, click on one of the option buttons
          </Text>
          <Text style={styles.topScreen}>
            2. To change your answer, click the another desired option button
          </Text>
          <Text style={styles.topScreen}>
            3. To save your answer, you MUST click on Save & Next
          </Text>
          <Text style={styles.topScreen}>
            4. To deselect a chosen answer, click on the chosen option again or
            click on the Clear Response button.
          </Text>
          <Text style={styles.topScreen}>
            5. To change an answer to a question, first select the question and
            then click on the new answer option followed by a click on the Save
            & Next button.
          </Text>
          <Text style={styles.topScreen}>
            5. For last question click on finish to submit your exam, Note:
            Attempting last question mandatory to submit the exam
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              borderTopWidth: 2,
              marginVertical: 5,
              paddingTop: 3,
              borderTopColor: 'rgba(0,0,0,0.1)',
            }}>
            Instructions during the exam
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: 20,
                height: 20,
                margin: 5,
                borderRadius: 8,
                backgroundColor: 'rgba(51, 183, 51,0.7)',
              }}></Text>
            <Text>Represents you have attempted the question</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: 20,
                height: 20,
                margin: 5,
                borderRadius: 8,
                backgroundColor: 'rgba(219, 108, 24,0.5)',
              }}></Text>
            <Text>Represents you have not attempted the question</Text>
          </View>
        </View>

        <View style={{marginTop: 5}}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              borderTopWidth: 2,
              marginVertical: 5,
              paddingTop: 3,
              borderTopColor: 'rgba(0,0,0,0.1)',
            }}>
            Instruction on results
          </Text>
          <Text>The symbols represents on result screen</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="checkmark"
              size={15}
              reverse
              color="rgba(32, 178, 30,0.8)"
              type={IconStyles.iconType}
            />
            <Text>Correct answers</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="close"
              size={15}
              reverse
              color="rgba(204, 46, 46,0.8)"
              type={IconStyles.iconType}
            />
            <Text>Wrong answers</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="warning"
              size={15}
              reverse
              color="rgba(206, 161, 26,0.6)"
              type={IconStyles.iconType}
            />
            <Text>Not attempted</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => routeToExamScreen()}
        style={{
          backgroundColor: 'green',
          height: 40,
          justifyContent: 'center',
          borderRadius: 20,
          width: '100%',
        }}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Start test</Text>
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = ({testSeries}) => {
  const {testQuestions} = testSeries;
  return {
    testQuestions,
  };
};

export default connect(mapStateToProps, {fetchAllQuestions})(ExamInstruction);

const styles = StyleSheet.create({
  topScreen: {
    fontSize: 15,
    marginBottom: 5,
  },
});
