import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider, Icon} from 'react-native-elements';
import {IconStyles} from '../../Styles';

const LibraryCard = (props) => {
  let title = '';
  if (props.content.fileName.length > 32) {
    title = props.content.fileName.substring(0, 32).concat('...');
  } else {
    title = props.content.fileName;
  }
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onClickLibrayItem}>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          paddingVertical: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'left', fontSize: 20, fontWeight: 'bold'}}>
            {title}
          </Text>
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <Icon
            size={25}
            type={IconStyles.iconType}
            color={'#000'}
            name="cloud-download"
          />
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default LibraryCard;
