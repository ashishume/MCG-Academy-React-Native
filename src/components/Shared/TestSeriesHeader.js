import {View, Text} from 'react-native';
import React from 'react';
import {IconStyles} from '../Styles';
import {Icon} from 'react-native-elements';

const TestSeriesHeader = ({
  headerName,
  navigation,
  iconName,
  onPressHandler,
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 55,
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
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        type={IconStyles.iconType}
        color="#000"
      />
      <Text style={{fontSize: 18, flex: 10}}>{headerName}</Text>

      {/* {isLanguage ? ( */}
      <Icon
        containerStyle={{
          flex: 1,
          flexBasis: 50,
        }}
        onPress={onPressHandler}
        name={iconName}
        type={IconStyles.iconType}
        color="#000"
      />
    </View>
  );
};

export default TestSeriesHeader;
