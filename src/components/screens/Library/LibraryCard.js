import React, {Fragment} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');

const LibraryCard = (props) => {
  let title = '';
  if (props.content.fileName.length > 20) {
    title = props.content.fileName.substring(0, 20).concat('...');
  } else {
    title = props.content.fileName;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onClickLibrayItem}
      style={{
        width: width / 2 - 30,
        height: 150,
        marginLeft: 10,
      }}>
      <View>
        <Image
          source={{uri: props.content.thumbnail}}
          style={{width: '100%', height: 100, resizeMode: 'cover'}}
        />
        <Text
          style={{
            textAlign: 'left',
            fontSize: 17,
            fontWeight: 'normal',
          }}>
          {title.toLowerCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LibraryCard;
