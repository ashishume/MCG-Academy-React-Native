import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {IconStyles} from '../../../Styles';
import RenderHtml from 'react-native-render-html';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SUPPORTED_LANGUAGES} from '../../../Utils/Language';
const Explanation = ({selectedLanguageQuestions}) => {
  const {width} = useWindowDimensions();
  const [explanation, setExplanation] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const currLang = await AsyncStorage.getItem('language');
        await getLanguageAndExplanation(currLang);
      } catch (e) {}
    })();

    () => {
      return setExplanation([]);
    };
  }, []);
  const getLanguageAndExplanation = async (currLang) => {
    try {
      let solutions = [];
      selectedLanguageQuestions.map((value) => {
        const questionContent = value?.content?.find(
          (item) => item?.language === currLang,
        );
        solutions.push({
          questionNumber: value?.questionNumber,
          answeredOption: value?.answeredOption,
          ...questionContent,
        });
      });
      await setExplanation(solutions);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };

  const changeLanguage = async () => {
    try {
      const currLang = await AsyncStorage.getItem('language');
      const newLang =
        currLang === SUPPORTED_LANGUAGES.English
          ? SUPPORTED_LANGUAGES.Hindi
          : SUPPORTED_LANGUAGES.English;
      await AsyncStorage.setItem('language', newLang);
      await getLanguageAndExplanation(newLang);
    } catch (e) {
      console.log('language changed failed');
    }
  };

  return (
    <Fragment>
      <View style={{alignSelf: 'center'}}>
        <Icon
          name="language"
          raised
          reverse
          type={IconStyles.iconType}
          color="#198c9e"
          onPress={() => changeLanguage()}
        />
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Explanations
      </Text>
      <FlatList
        data={explanation}
        style={{marginBottom: 170}}
        keyExtractor={(item) => item?._id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                borderBottomColor: 'rgba(0, 0, 0,0.4)',
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Question {item?.questionNumber}
                </Text>
                {item?.answeredOption?.isCorrect === true ? (
                  <Icon
                    name="checkmark"
                    size={20}
                    reverse
                    color="rgba(32, 178, 30,0.8)"
                    type={IconStyles.iconType}
                  />
                ) : null}
                {item?.answeredOption?.isCorrect === false ? (
                  <Icon
                    name="close"
                    size={20}
                    reverse
                    color="rgba(204, 46, 46,0.8)"
                    type={IconStyles.iconType}
                  />
                ) : null}
                {item?.answeredOption === undefined ? (
                  <Icon
                    name="warning"
                    size={20}
                    reverse
                    color="rgba(206, 161, 26,0.6)"
                    type={IconStyles.iconType}
                  />
                ) : null}
              </View>
              <View>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: item?.questionTitle,
                  }}
                />
              </View>
              <View>
                {item?.answeredOption !== undefined ? (
                  <Text
                    style={{
                      fontSize: 20,
                      paddingBottom: 5,
                      color: 'rgb(49, 183, 58)',
                      borderBottomColor: 'rgba(0,0,0,0.4)',
                    }}>
                    Your answer: {item?.answeredOption?.optionTitle}
                  </Text>
                ) : null}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'rgb(47, 138, 183)',
                  }}>
                  Explanation (Question {item?.questionNumber}):
                </Text>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: item?.solutionExplanation,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </Fragment>
  );
};

export default Explanation;
