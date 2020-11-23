import React from 'react';
import {View, Text, Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../Styles';
const TeacherWaitingPage = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        We will update you Soon
      </Text>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Text style={{padding: 5}}>
          <Icon
            name="logo-whatsapp"
            raised
            onPress={() => {
              Linking.openURL('https://wa.me/918463038257');
            }}
            size={30}
            reverse
            type={IconStyles.iconType}
          />
        </Text>
        <Text style={{padding: 5}}>
          <Icon
            name="call"
            raised
            onPress={() => {
              Linking.openURL(`tel:${8463038257}`);
            }}
            size={30}
            reverse
            type={IconStyles.iconType}
          />
        </Text>
      </View>
    </View>
  );
};

export default TeacherWaitingPage;
