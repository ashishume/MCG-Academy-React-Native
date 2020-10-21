import React, {Fragment} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import BadgeType from '../../Shared/TypeBadge';
import Badge from '../../Shared/Badge';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AmountBadge from '../../Shared/AmountBadge';
const {height, width} = Dimensions.get('window');
const FreeVideosCard = ({content, onClickVideoItem}) => {
  let shortTitle = content.title;
  let shortAuthor = content.author;
  if (content.title.length > 50) {
    shortTitle = content.title.substring(0, 50).trim().concat('...');
  }
  if (content.author.length > 35) {
    shortAuthor = content.author.substring(0, 35).trim().concat('...');
  }
  return (
    <Fragment>
      <TouchableOpacity onPress={onClickVideoItem}>
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
              <Text style={styles.title}>{shortTitle}</Text>
              <View style={styles.type}>
                <Badge name={content.category} />
                <BadgeType name={content.videoType} color="#c20202" />
                <Text style={styles.author}>{shortAuthor}</Text>
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
    paddingVertical: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginVertical: 10,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
  },
  innerContainer: {
    // flex: 2,
    // flexDirection: 'row',
  },
  image: {
    // flex: 1,
    width: width - 20,
    height: 170,
    marginTop: 15,
    resizeMode: 'cover',
    alignSelf: 'center',
    // padding:200,
    // marginLeft: 5,
    // borderRadius: 100,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
    // marginTop: 10,
    // marginLeft: 10,
  },
  title: {fontSize: 20, fontWeight: '100'},
  author: {fontSize: 16, fontWeight: '500', marginLeft: 20},
  type: {flex: 1, flexDirection: 'row', paddingTop: 5},
});

export default FreeVideosCard;
