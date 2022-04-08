import React, {Fragment, useEffect} from 'react';
import {View} from 'react-native';
import {fetchAllLibrary} from '../../../store/actions/library';
import {useDispatch, useSelector} from 'react-redux';
import LibraryCard from './LibraryCard';
import TopHeader from '../../Shared/Header';
import {FlatList} from 'react-native-gesture-handler';
import {StateInterface} from '../../../Shared/Interfaces/reducer';
import CategoryFilter from '../../Shared/Filter';

const Library = ({navigation}: any) => {
  const dispatch = useDispatch();
  const library = useSelector((state: StateInterface) => state.library.library);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      dispatch(fetchAllLibrary());
    });
  }, [navigation]);

  const changeLibrary = async () => {
    await dispatch(fetchAllLibrary());
  };
  return (
    <Fragment>
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <TopHeader name="Library" />
        <CategoryFilter
          setNewCategory={(courseId: string) => changeLibrary()}
        />
        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: 10,
            height: '100%',
            flex: 1,
          }}>
          <FlatList
            numColumns={2}
            data={library}
            renderItem={LibraryCard}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </Fragment>
  );
};

export default Library;
