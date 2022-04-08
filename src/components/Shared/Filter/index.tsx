import {
  View,
  Text,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {StateInterface} from '../../../Shared/Interfaces/reducer';

const CategoryFilter = ({setNewCategory, width = '100%'}: any) => {
  const [visible, setVisible] = useState(false);
  const categories = useSelector(
    (state: StateInterface) => state.category.category,
  );

  const setActiveCategory = async (categoryId: string) => {
    try {
      await AsyncStorage.setItem('categoryId', categoryId);
      await setVisible(!visible);
      await setNewCategory(categoryId);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setVisible(!visible)}>
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            width: width,
            marginLeft: width === '100%' ? 0 : 20,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'lightgray',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 20, color: 'gray'}}>Filter</Text>
        </View>
      </TouchableOpacity>
      {visible ? (
        <ScrollView
          style={{
            position: 'absolute',
            top: 50,
            backgroundColor: '#fff',
            width: width,
            height: 150,
            zIndex: 99,
            marginLeft: width === '100%' ? 0 : 20,
            paddingTop: 20,
            elevation: 5,
            borderRadius: 5,
          }}
          contentContainerStyle={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {categories.map((category: {name: string; _id: string}) => {
            return (
              <Fragment key={category._id}>
                <Text
                  numberOfLines={1}
                  onPress={() => setActiveCategory(category._id)}
                  style={{
                    width: '85%',
                    fontSize: 18,
                    borderBottomWidth: 1,
                    paddingVertical: 7,
                    paddingLeft: 7,
                    color: 'gray',
                    zIndex: 99,
                    borderBottomColor: 'lightgray',
                  }}>
                  {category.name}
                </Text>
              </Fragment>
            );
          })}
        </ScrollView>
      ) : null}
    </>
  );
};

export default CategoryFilter;
