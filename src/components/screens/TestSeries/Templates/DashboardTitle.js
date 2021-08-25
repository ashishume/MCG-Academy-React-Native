import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import Styles, {IconStyles} from '../../../Styles';
const DashboardTitle = () => {
  return (
    <View style={{flexDirection: 'row', marginVertical: 20}}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <Icon
          name="checkmark-circle"
          size={18}
          color="green"
          type={IconStyles.iconType}
        />
        <Text style={styles.subtitle}>Realtime exam experience</Text>
      </View>
      <View style={{flexDirection: 'column', flex: 1}}>
        <Icon
          name="checkmark-circle"
          size={18}
          color="green"
          type={IconStyles.iconType}
        />
        <Text style={styles.subtitle}>Compete with other students</Text>
      </View>
      <View style={{flexDirection: 'column', flex: 1}}>
        <Icon
          name="checkmark-circle"
          size={18}
          color="green"
          type={IconStyles.iconType}
        />
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Exam based ranking system
        </Text>
      </View>
    </View>
  );
};

export default DashboardTitle;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 15,
    ...Styles.fontFamily,
    fontWeight: 'bold',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.4)',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
});
