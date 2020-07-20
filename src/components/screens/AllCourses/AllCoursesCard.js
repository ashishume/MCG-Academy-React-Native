import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import BadgeType from '../../Shared/Badge';
import AmountBadge from '../../Shared/AmountBadge';
const {height, width} = Dimensions.get('window');

const AllCourseCard = ({content}) => {
  let title = '';
  if (content.courseTitle.length > 33) {
    title = content.courseTitle.substring(0, 40) + '...';
  } else {
    title = content.courseTitle;
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image style={styles.image} source={{uri: content.courseImage}} />
      </View>
      <View style={styles.contentContainer}>
        <BadgeType name={content.category} />
        <Text style={styles.title}>{title}</Text>
        <View>
          <AmountBadge name={content.price} color="#4fb524" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 15,
    padding: 5,
    width: width / 2 - 30,
    height: width / 2 + 100,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingLeft: 10,
  },
  title: {fontSize: 14, height: 40, fontWeight: 'bold'},
  price: {fontSize: 12},
});

export default AllCourseCard;
