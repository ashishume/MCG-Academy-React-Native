import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const Description = (props) => {
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <Text style={styles.author}>Author: {props.content.author}</Text>
          <Text style={styles.subHeading}>Course Details</Text>
          <Text style={{fontSize: 15}}>
            Time limit: {props.content.timeLimit}
          </Text>
          <Text style={{fontSize: 15}}>
            Course type: {props.content.category}
          </Text>
          <Text style={styles.subHeading}>Course Description</Text>
          <Text style={styles.courseDescription}>
            {props.content.courseDescription}
          </Text>
        </View>
      </View>
    </ScrollView>
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
  author: {textAlign: 'left', fontSize: 20, fontWeight: 'normal'},
  subHeading: {fontSize: 25, marginTop: 10, fontWeight: 'bold'},
  courseDescription: {
    fontSize: 15,
    marginTop: 10,
    fontSize: 17,
    textAlign: 'justify',
  },
});
export default Description;
