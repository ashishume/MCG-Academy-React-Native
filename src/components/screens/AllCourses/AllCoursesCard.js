import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import TypeBadge from '../../Shared/TypeBadge';
import BadgeType from '../../Shared/Badge';
import Styles from '../../Styles';
const {height, width} = Dimensions.get('window');

const AllCourseCard = ({content}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image
          PlaceholderContent={<ActivityIndicator color="#c20202" />}
          style={styles.image}
          source={{uri: content.courseImage}}
        />
      </View>
      <View style={styles.contentContainer}>
        <BadgeType name={content.category} />
        <Text numberOfLines={1} style={styles.title}>
          {content.courseTitle.toLowerCase().replace(/\b(\w)/g, (k) => k.toUpperCase())}
        </Text>
        {/* <Text numberOfLines={1} style={styles.price}>
          ₹{content.price}
        </Text> */}
        <Text numberOfLines={1} style={styles.author}>
          {content.author.toLowerCase().replace(/\b(\w)/g, (k) => k.toUpperCase())}
        </Text>
        <View style={{marginTop: 3}}>
          <TypeBadge name={content.courseType} color="#4fb524" />
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
    height: width / 3 + 100,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  image: {
    // flex: 1,
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingLeft: 5,
  },
  courseType: {
    fontSize: 15,
  },
  author: {fontSize: 13, marginBottom: 2},
  title: {fontSize: 15, fontWeight: 'bold', ...Styles.fontFamily},
  price: {fontSize: 15, ...Styles.fontFamily, fontWeight: '700'},
});

export default AllCourseCard;
