import React, {Fragment, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Icon, Divider, Badge} from 'react-native-elements';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {IconStyles} from '../../Styles';
import ContentList from '../ContentList/ContentList';
const {height, width} = Dimensions.get('window');
const BuyCourseCard = ({content}) => {
  const videoClickEventHandler = (e) => {
    
    console.log(e.isLocked);
    if (e.isLocked === true) {
      console.log('route');
    } else {
      console.log('failed');
    }
  };
  return (
    <Fragment>
      <View style={styles.container}>
        <View>
          <Text style={styles.courseTitle}>{content.courseTitle}</Text>
          <Text style={styles.author}>{content.author}</Text>
        </View>
        <View style={styles.courseTypeContainer}>
          <Text style={styles.courseType}>{content.courseType}</Text>
        </View>
        <View>
          <Text style={styles.price}>₹{content.price}</Text>
        </View>

        <View style={styles.buyNowContainer}>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buyNowButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.subHeading}>Course Details</Text>
          <Text style={{fontSize: 15}}>Time limit: {content.timeLimit}</Text>
          <Text style={{fontSize: 15}}>Course type: {content.category}</Text>
          <Text style={styles.subHeading}>Course Description</Text>
          <Text style={styles.courseDescription}>
            {content.courseDescription}
          </Text>
        </View>
        <View>
          <ContentList
            isBought={false}
            videoClickEventHandler={(e) => videoClickEventHandler(e)}
            data={content.content}
          />
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 100,
  },
  courseTitle: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  author: {textAlign: 'center', fontSize: 15, fontWeight: 'normal'},
  courseTypeContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseType: {
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#ff8282',
    width: 150,
    fontSize: 17,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  price: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  buyNowContainer: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#db306c',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
    },
    elevation: 5,
    shadowRadius: 5,
  },
  buyNowButton: {width: width - 70, height: 40, justifyContent: 'center'},
  buyNowButtonText: {color: '#fff', fontSize: 20, alignSelf: 'center'},
  subHeading: {fontSize: 25, marginTop: 10, fontWeight: 'bold'},
  courseDescription: {
    fontSize: 15,
    marginTop: 10,
    fontSize: 17,
    textAlign: 'justify',
  },
});

export default BuyCourseCard;
