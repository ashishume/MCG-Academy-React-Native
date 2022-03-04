import {View, Text, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import {Icon} from 'react-native-elements';
import { IconStyles } from '../../../Styles';

const ReportComponent = ({setModalVisible}) => {
  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setModalVisible(true)}
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Icon
          name="information-circle-outline"
          type={IconStyles.iconType}
          size={20}
          containerStyle={{marginHorizontal: 10}}
        />
        <Text>Report</Text>
      </TouchableOpacity>
    </Fragment>
  );
};

export default ReportComponent;
