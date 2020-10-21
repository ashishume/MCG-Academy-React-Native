import React, {Fragment} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import TypeBadge from '../../Shared/TypeBadge';
import Styles from '../../Styles';
const LatestCourseItem = (props) => {
  let title = '';

  if (props.content.courseTitle.length > 32) {
    title = props.content.courseTitle.substring(0, 30) + '...';
  } else {
    title = props.content.courseTitle;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={{flex: 1}}>
        <Image
          PlaceholderContent={<ActivityIndicator color="#c20202" />}
          source={{uri: props.content.courseImage}}
          style={styles.imageCard}
        />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{props.content.author}</Text>
        <Text style={styles.courseType}>₹ {props.content.price}</Text>
        <View style={styles.badgeContainer}>
          <TypeBadge color="#4fb524" name={props.content.courseType} />
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
    width: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  innerContainer: {flex: 1, paddingLeft: 10, paddingTop: 0},
  title: {fontSize: 15, height: 40, fontWeight: 'bold', ...Styles.fontFamily},
  author: {fontSize: 15},
  courseType: {
    fontSize: 17,
  },
  badgeContainer: {flex: 1, flexDirection: 'row'},
});

export default LatestCourseItem;
