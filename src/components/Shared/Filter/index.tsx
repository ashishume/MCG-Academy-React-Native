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

const CategoryFilter = () => {
  const [visible, setVisible] = useState(false);
  const categories = useSelector(
    (state: StateInterface) => state.category.category,
  );

  const setActiveCategory = async (categoryId: string) => {
    try {
      const categoryIdData = await AsyncStorage.setItem(
        'categoryId',
        categoryId,
      );
      setVisible(!visible);
      return categoryIdData;
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
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: '50%',
            borderRadius: 5,
            shadowColor: '#bfbdbd',
            elevation: 4,
            shadowRadius: 5,
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
            width: '50%',
            height: '50%',
            zIndex: 1,
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
