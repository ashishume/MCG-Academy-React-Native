import React, {useEffect} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {IconStyles} from '../Styles';
const InitialSetup = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Dashboard');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={IconStyles.iconColor} />
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        We are setting up your data please wait you will be redirected
      </Text>
    </View>
  );
};

export default InitialSetup;
