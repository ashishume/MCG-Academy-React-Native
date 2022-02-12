import React, {useEffect} from 'react';
import {BackHandler, View, TouchableOpacity, Text} from 'react-native';
import {IconStyles} from '../../../Styles';
import {Icon} from 'react-native-elements';
import Scores from './Scores';
import Explanation from './Explanation';

const Results = (props) => {
  const {selectedLanguageQuestions, result} = props.route.params;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  });

  return (
    <View style={{margin: 5}}>
      <Scores result={result} />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          props.navigation.navigate('Leaderboard', {
            examId: selectedLanguageQuestions[0]?.exam?._id,
            examName: selectedLanguageQuestions[0]?.exam?.name,
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
      <Explanation selectedLanguageQuestions={selectedLanguageQuestions} />
    </View>
  );
};

export default Results;
