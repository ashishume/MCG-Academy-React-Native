import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Styles from '../../Styles';
const TestSeriesListTemplate = (props) => {
  const {item, isView} = props;
  const routeToExamInstruction = () => {
    if (!isView) props.navigation.navigate('Exam description', {data: item});
  };

  return (
    <TouchableOpacity
      onPress={() => routeToExamInstruction()}
      activeOpacity={0.8}
      style={{
        width: '100%',
        height: 90,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.3)',
        marginVertical: 7,
        borderRadius: 9,
        paddingLeft: 10,
        paddingTop: 10,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
        }}
        numberOfLines={1}>
        {item.name}
      </Text>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Text
          style={{
            fontSize: 15,
            ...Styles.fontFamily,
            fontWeight: 'normal',
          }}>
          {item.examTime} mins
        </Text>
        <Text
          style={{
            ...Styles.fontFamily,
            fontWeight: 'normal',
            paddingLeft: 10,
            fontSize: 15,
          }}>
          {item.maxMarks} marks
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TestSeriesListTemplate;
