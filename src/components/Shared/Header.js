import React, {Fragment} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
const TopHeader = props => {
  return (
    <Fragment>
      <View style={styles.menuContainer}>
        <View style={styles.leftItem}>
          <Text style={styles.headerText}>{props.name}</Text>
        </View>
        <View style={styles.rightItem}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../assets/logo.jpg')}
          />
        </View>
      </View>
      {/* <Icon
        name="ios-arrow-back"
        size={IconStyles.iconSize}
        type={IconStyles.iconType}
        color={IconStyles.iconColor}
        />{' '}
        <TouchableOpacity
        style={styles.menuButton}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      /> */}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowOpacity: 1,
    shadowOffset: {
      height: 15,
    },
    elevation: 10,
    shadowRadius: 5,
    height: 57,
  },
  headerText: {fontSize: 20, fontWeight: 'bold'},
  leftItem: {flex: 1, justifyContent: 'center', marginLeft: 10},
  rightItem: {justifyContent: 'center'},
});

export default TopHeader;
