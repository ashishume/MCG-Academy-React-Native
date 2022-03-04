import React, {Fragment, useEffect} from 'react';
import {View} from 'react-native';
import {fetchAllLibrary} from '../../../store/actions/library';
import {connect} from 'react-redux';
import LibraryCard from './LibraryCard';
import TopHeader from '../../Shared/Header';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const Library = (props) => {
  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      props.fetchAllLibrary();
    });
  }, [props.navigation]);

  return (
    <Fragment>
      <TopHeader name="Library" />
      <View
        style={{
          backgroundColor: '#fff',
          paddingVertical: 10,
          height: '100%',
          flex: 1,
        }}>
        <FlatList
          numColumns={2}
          data={props.library}
          renderItem={LibraryCard}
          keyExtractor={(item) => item._id}
        />
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
