import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import Styles, {IconStyles} from '../../Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ContentList = ({data, videoClickEventHandler, isBought}) => {
  return (
    <View style={styles.container}>
      <Divider />
      <Text style={styles.title}>Contents</Text>
      {data.map((value, i) => {
        return (
          <Fragment key={i}>
            <TouchableOpacity onPress={() => videoClickEventHandler(value,i)}>
              <View style={styles.videoContainer}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 20}}>
                    {value.title.length > 25
                      ? value.title.substring(0, 25).concat('...')
                      : value.title}
                  </Text>
                </View>
                {isBought === false ? (
                  <View style={{alignSelf: 'flex-end'}}>
                    <Text style={{fontSize: 20}}>
                      {value.isLocked === false ? (
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
                ) : null}
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
});

export default ContentList;
