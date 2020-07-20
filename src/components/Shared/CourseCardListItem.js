import React, {Fragment} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import BadgeType from './Badge';

const CourseCardListItem = ({content}) => {
  let shortTitle = content.courseTitle;
  let shortAuthor = content.author;
  if (content.courseTitle.length > 70) {
    shortTitle = content.courseTitle.substring(0, 70).trim().concat('...');
  }
  if (content.author.length > 35) {
    shortAuthor = content.author.substring(0, 35).trim().concat('...');
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={{justifyContent: 'center'}}>
            <Image source={{uri: content.courseImage}} style={styles.image} />
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
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 3,
    paddingRight: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderColor: '#fff',
    height: 150,
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
    width: 110,
    height: 110,
    marginLeft: 5,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    marginTop: 15,
    marginLeft: 10,
  },
  title: {fontSize: 20, fontWeight: 'bold'},
  author: {fontSize: 15, fontWeight: '500'},
  type: {flex: 1, flexDirection: 'row', paddingTop: 5},
});

export default CourseCardListItem;
