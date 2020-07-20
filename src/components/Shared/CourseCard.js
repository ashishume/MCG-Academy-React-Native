import React, {Fragment} from 'react';
import {View, Text, Image} from 'react-native';
import BadgeType from './Badge';

const CourseCard = ({title, type, thumbail, author}) => {
  let shortTitle = title;
  let shortAuthor = author;
  if (title.length > 70) {
    shortTitle = title
      .substring(0, 70)
      .trim()
      .concat('...');
  }
  if (author.length > 35) {
    shortAuthor = author
      .substring(0, 35)
      .trim()
      .concat('...');
  }

  return (
    <Fragment>
      <View
        style={{
          paddingLeft: 3,
          paddingRight: 3,
          marginLeft: 5,
          marginRight: 5,
          marginTop: 10,
          borderColor: '#fff',
          height: 150,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          borderBottomWidth: 1,
          borderBottomColor:'lightgray',
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={{uri: thumbail}}
              style={{
                width: 110,
                height: 110,
                marginLeft: 5,
                borderRadius: 100,
                resizeMode: 'cover',
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 15,
              marginLeft: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{shortTitle}</Text>
            <Text style={{fontSize: 15, fontWeight: '500'}}>{shortAuthor}</Text>
            <View style={{flex: 1, flexDirection: 'row', paddingTop: 5}}>
              <BadgeType name={type} />
            </View>
          </View>
        </View>
      </View>
    </Fragment>
  );
};

export default CourseCard;
