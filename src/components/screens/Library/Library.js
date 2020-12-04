import React, {Fragment, useEffect} from 'react';
import {View, Linking} from 'react-native';
import {fetchAllLibrary} from '../../../store/actions/library';
import {connect} from 'react-redux';
import LibraryCard from './LibraryCard';
import TopHeader from '../../Shared/Header';
import {ScrollView} from 'react-native-gesture-handler';

const Library = (props) => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.fetchAllLibrary();
    });
    return unsubscribe;
  }, [props.navigation]);

  const clickLibraryItem = (e) => {
    Linking.openURL(e.fileUrl);
  };
  return (
    <Fragment>
      <TopHeader name="Library" />
      <View
        style={{backgroundColor: '#fff', paddingVertical: 10, height: '100%'}}>
        <ScrollView scrollEventThrottle={25} indicatorStyle="black">
          <View
            style={{
              paddingHorizontal: 10,
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {props.library.map((value, i) => {
              return (
                <LibraryCard
                  content={value}
                  key={i}
                  onClickLibrayItem={() => clickLibraryItem(value)}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    library: state.library.library,
  };
};
export default connect(mapStateToProps, {fetchAllLibrary})(Library);
