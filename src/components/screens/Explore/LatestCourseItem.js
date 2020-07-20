import React, {Fragment} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AmountBadge from '../../Shared/AmountBadge';

const LatestCourseItem = ({content}) => {
  let title = '';

  if (content.courseTitle.length > 32) {
    title = content.courseTitle.substring(0, 30) + '...';
  } else {
    title = content.courseTitle;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={{flex: 1}}>
        <Image source={{uri: content.courseImage}} style={styles.imageCard} />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{content.author}</Text>
        <Text style={styles.courseType}>{content.courseType}</Text>
        <View style={styles.badgeContainer}>
          <AmountBadge color="#4fb524" name={content.price} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 270,
    width: 195,
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  imageCard: {
    flex: 1,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  innerContainer: {flex: 1, paddingLeft: 10, paddingTop: 10},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  author: {fontSize: 13, paddingBottom: 1, paddingTop: 1},
  courseType: {
    fontSize: 12,
    paddingBottom: 2,
    paddingTop: 1,
  },
  badgeContainer: {flex: 1, flexDirection: 'row'},
});

export default LatestCourseItem;
