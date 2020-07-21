import React, {Fragment} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../Styles';
const TopHeader = (props) => {
  return (
    <Fragment>
      <View style={styles.menuContainer}>
        <View style={styles.leftItem}>
          <Text style={styles.headerText}>
            {props.name}
            {props.backIcon ? (
              <Icon
                onPress={props.onBackIconClick}
                round={true}
                size={30}
                type={IconStyles.iconType}
                color={'#000'}
                name="ios-arrow-back-sharp"
              />
            ) : null}
          </Text>
        </View>
        <View style={styles.rightItem}>
          {props.IconName ? (
            <Icon
              onPress={props.onIconClick}
              round={true}
              size={20}
              type={IconStyles.iconType}
              color={'#000'}
              raised
              name={props.IconName}
            />
          ) : null}
        </View>
      </View>
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
  rightItem: {justifyContent: 'center', marginRight: 10},
});

export default TopHeader;
