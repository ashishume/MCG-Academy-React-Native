import React, {useEffect, useState} from 'react';
import RenderHtml from 'react-native-render-html';
import {FlatList, View, useWindowDimensions, Text} from 'react-native';
import {IconStyles} from '../../Styles';
import {Icon} from 'react-native-elements';

const Results = (props) => {
  const {params} = props.route;
  const {width} = useWindowDimensions();

  // const [attempted, setAttempted] = useState(0);
  // const [correct, setCorrect] = useState(0);
  // const [wrong, setWrong] = useState(0);

  useEffect(() => {
    // attemptedQuestions();
  }, []);

  // const attemptedQuestions = () => {
  //   // params.map(async (v) => {
  //   //   if (v?.answeredOption?.isCorrect === true) await setCorrect(correct + 1);
  //   //   if (v?.answeredOption?.isCorrect === false) await setWrong(wrong + 1);
  //   //   if (v?.answeredOption !== undefined) await setAttempted(attempted + 1);
  //   // });
  // };

  return (
    <View style={{margin: 5}}>
      {/* <View>
        <Text>Attempted Questions: {attempted}</Text>
        <Text>Correct Answers: {correct}</Text>
        <Text>Wrong Answers: {wrong}</Text>
      </View> */}

      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Correct Answers</Text>
      <FlatList
        data={params}
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
                    raised
                    size={20}
                    reverse
                    color="rgba(32, 178, 30,0.8)"
                    type={IconStyles.iconType}
                  />
                ) : null}
                {item?.answeredOption?.isCorrect === false ? (
                  <Icon
                    name="close"
                    raised
                    size={20}
                    reverse
                    color="rgba(204, 46, 46,0.8)"
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
