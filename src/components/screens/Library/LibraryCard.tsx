import React, {Fragment} from 'react';
import {View, Text, Image, Dimensions, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');

const LibraryCard = ({item, index}) => {
  const clickLibraryItem = () => {
    Linking.openURL(item.fileUrl);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={clickLibraryItem}
      style={{
        width: width / 2 - 20,
        height: 150,
        marginLeft: 10,
      }}>
      <View>
        <Image
          source={{uri: item.thumbnail}}
          style={{width: '100%', height: 100, resizeMode: 'cover'}}
        />
        <Text
          numberOfLines={1}
          style={{
            textAlign: 'left',
            fontSize: 17,
            fontWeight: 'normal',
          }}>
          {item.fileName.toLowerCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LibraryCard;
