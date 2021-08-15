import React from 'react';
import RenderHtml from 'react-native-render-html';
import {FlatList, View, useWindowDimensions, Text} from 'react-native';
import {IconStyles} from '../../Styles';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';

const Results = (props) => {
  const {allQuestions, result} = props.route.params;
  const {width} = useWindowDimensions();

  const fontStyle = {fontSize: 20, textAlign: 'left', fontWeight: 'bold'};

  return (
    <View style={{margin: 5}}>
      <View
        style={{
          marginVertical: 5,
          paddingVertical: 5,
        }}>
        <Text style={{fontSize: 25, marginBottom: 10}}>Your results</Text>
        <Text style={fontStyle}>Attempted Questions: {result.attempted}</Text>
        <Text style={fontStyle}>Correct Answers: {result.correct}</Text>
        <Text style={fontStyle}>Wrong Answers: {result.wrong}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.navigation.navigate('Leaderboard')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: 'rgba(80, 188, 50,0.4)',
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
          marginTop: 5,
        }}>
        Explanations
      </Text>
      <FlatList
        data={allQuestions}
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
              <View
                style={{
                  marginBottom: 5,
                  backgroundColor: 'rgba(44, 97, 211,0.2)',
                }}>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: item.solutionExplanation,
                  }}
                />
              </View>
              <View style={{backgroundColor: 'rgba(24, 127, 41,0.2)'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
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
