import React, {Fragment} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import BadgeType from '../../Shared/Badge';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
              <Image source={{uri: content.videoImage}} style={styles.image} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{shortTitle}</Text>
              <Text style={styles.author}>{shortAuthor}</Text>
              <View style={styles.type}>
                <BadgeType name={content.category} />
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
    paddingLeft: 3,
    paddingRight: 3,
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#fff',
    height: 130,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 5,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  title: {fontSize: 17, fontWeight: 'bold', height: 50},
  author: {fontSize: 15, fontWeight: '500'},
  type: {flex: 1, flexDirection: 'row', paddingTop: 5},
});

export default FreeVideosCard;
