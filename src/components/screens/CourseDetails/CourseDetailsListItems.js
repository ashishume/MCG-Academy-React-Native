import React, {Fragment} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {IconStyles} from '../../Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CourseDetailsListItem = ({data, videoClickEventHandler}) => {
  const clickVideoHandler = (value, i) => {
    if (value.isLocked == false) {
      if (value.urlType == 'video') videoClickEventHandler(value, i);
      else Linking.openURL(value.url);
    }
  };

  return (
    <View style={styles.container}>
      <Divider />
      <Text style={styles.title}>Contents</Text>
      {data.map((value, i) => {
        return (
          <Fragment key={i}>
            <TouchableOpacity onPress={() => clickVideoHandler(value, i)}>
              <View style={styles.videoContainer}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 20}}>
                    {value.title.length > 25
                      ? value.title.substring(0, 25).concat('...')
                      : value.title}
                  </Text>
                </View>
                <View style={{alignSelf: 'flex-end'}}>
                  <Text style={{fontSize: 20}}>
                    {value.isLocked === true ? (
                      <Icon
                        round={true}
                        size={15}
                        type={IconStyles.iconType}
                        color={'#000'}
                        raised
                        name="lock-closed"
                      />
                    ) : (
                      <Icon
                        round={true}
                        size={15}
                        type={IconStyles.iconType}
                        color={'#000'}
                        raised
                        name="ios-chevron-forward"
                      />
                    )}
                  </Text>
                </View>
              </View>
              <Divider />
            </TouchableOpacity>
          </Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 20},
  title: {
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  videoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  true: {
    backgroundColor: 'red',
  },
});

export default CourseDetailsListItem;
