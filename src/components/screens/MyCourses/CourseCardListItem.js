import React, {Fragment} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import BadgeType from '../../Shared/Badge';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CourseCardListItem = ({
  contentData,
  onClickCourseItem,
  isExpired,
  expiryDateData,
}) => {
  const content = contentData;

  return (
    <Fragment>
      <TouchableOpacity onPress={onClickCourseItem}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={{justifyContent: 'center'}}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#c20202" />}
                source={{uri: content.courseImage}}
                style={styles.image}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {content.courseTitle
                  .toLowerCase()
                  .replace(/\b(\w)/g, (k) => k.toUpperCase())}
              </Text>
              <Text numberOfLines={1} style={styles.author}>
                {content.author
                  .toLowerCase()
                  .replace(/\b(\w)/g, (k) => k.toUpperCase())}
              </Text>
              <View style={styles.type}>
                <BadgeType name={content.category} />
                {isExpired == true ? (
                  <Text
                    style={{
                      paddingLeft: 5,
                      fontWeight: 'bold',
                      fontSize: 11,
                    }}>
                    Validity: {new Date(expiryDateData).toDateString()}
                  </Text>
                ) : null}
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
  title: {fontSize: 17, fontWeight: 'bold'},
  author: {fontSize: 15, fontWeight: '500'},
  type: {flex: 1, flexDirection: 'row', paddingTop: 5},
});

export default CourseCardListItem;
