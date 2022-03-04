import React, {Fragment} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import BadgeType from '../../Shared/TypeBadge';
import Badge from '../../Shared/Badge';
const {height, width} = Dimensions.get('window');
const FreeVideosCard = ({content, onClickVideoItem}) => {
  return (
    <Fragment>
      <TouchableOpacity activeOpacity={0.9} onPress={onClickVideoItem}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={{justifyContent: 'center'}}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#c20202" />}
                source={{uri: content.videoImage}}
                style={styles.image}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {content.title
                  .toLowerCase()
                  .replace(/\b(\w)/g, (k) => k.toUpperCase())}
              </Text>
              <View style={styles.type}>
                <Badge name={content.category} />
                <BadgeType name={content.videoType} color="#c20202" />
                <Text numberOfLines={1} style={styles.author}>
                  {content.author
                    .toLowerCase()
                    .replace(/\b(\w)/g, (k) => k.toUpperCase())}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    borderRadius: 10,
    backgroundColor: '#fff',
    // elevation: 10,
  },
  innerContainer: {
    // flex: 2,
    // flexDirection: 'row',
  },
  image: {
    width: width - 10,
    height: 200,
    marginTop: 15,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {fontSize: 18, fontWeight: '100', paddingTop: 5},
  author: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
  },
  type: {flex: 1, flexDirection: 'row', paddingTop: 5},
});

export default FreeVideosCard;
