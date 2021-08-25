import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import Styles, {IconStyles} from '../../../Styles';
const ExamsListTemplate = (props) => {
  const {
    item,
    continueToInstruction = false,
    isTestSeriesBought = false,
  } = props;
  const routeToExamInstruction = () => {
    if (continueToInstruction || isTestSeriesBought)
      props.navigation.navigate('Exam description', {data: item});
    else {
      console.log('to be sent to payment screen', item);
    }
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
        {continueToInstruction || isTestSeriesBought ? (
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Icon
              type={IconStyles.iconType}
              size={25}
              name="arrow-forward-circle"
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ExamsListTemplate;
