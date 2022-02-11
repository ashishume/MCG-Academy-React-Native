import React, {useEffect} from 'react';
import RenderHtml from 'react-native-render-html';
import {
  FlatList,
  BackHandler,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {IconStyles} from '../../Styles';
import {Icon} from 'react-native-elements';

const Results = (props) => {
  const {selectedLanguageQuestions, result} = props.route.params;
  const {width} = useWindowDimensions();
  const fontStyle = {fontSize: 20, textAlign: 'left', fontWeight: 'bold'};
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  });
  return (
    <View style={{margin: 5}}>
      <View
        style={{
          marginVertical: 5,
          paddingVertical: 5,
        }}>
        <Text style={{fontSize: 25, marginBottom: 10}}>Your results</Text>
        <Text style={fontStyle}>Attempted Questions: {result.attempted}</Text>
        <Text style={fontStyle}>Your score: {result.correct}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          props.navigation.navigate('Leaderboard', {
            examId: selectedLanguageQuestions[0].exam._id,
            examName: selectedLanguageQuestions[0].exam.name,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 5,
          }}>
          <Icon name="md-bar-chart" size={20} type={IconStyles.iconType} />
          <Text>View Leaderboard</Text>
        </View>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Explanations
      </Text>
      <FlatList
        data={selectedLanguageQuestions}
        style={{marginBottom: 170}}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 2,
                marginVertical: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Question {item.questionNumber}
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
                    html: item.questionTitle,
                  }}
                />
              </View>
              <View>
                {item?.answeredOption !== undefined ? (
                  <Text
                    style={{
                      fontSize: 20,
                      paddingBottom: 5,
                      color: '#2c8718',
                      borderBottomColor: 'rgba(0,0,0,0.4)',
                    }}>
                    Your answer: {item?.answeredOption?.optionTitle}
                  </Text>
                ) : null}
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'blue'}}>
                  Explanation (Question {item.questionNumber}):
                </Text>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: item.solutionExplanation,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Results;
