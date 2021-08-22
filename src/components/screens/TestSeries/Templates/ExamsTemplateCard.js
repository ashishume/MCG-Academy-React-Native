import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');
const ExamsTemplateCard = (props) => {
  const [isEnrolled, setEnrolled] = useState(false);
  const {_id, examImageUrl, instructions, isPaid, name, price, timeLimit} =
    props.data;
  const {boughtTestData} = props;
  useEffect(() => {
    const funcCall = async () => {
      if (boughtTestData.length !== 0) {
        const check = await boughtTestData.some(
          (value) => value.test._id === _id,
        );
        await setEnrolled(check);
      } else {
        setEnrolled(false);
      }
    };
    funcCall();
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => props.routeToDescription(props.data)}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            source={{
              uri: examImageUrl,
            }}
            style={{borderRadius: 50, width: 70, height: 70}}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: 10,
            }}
            numberOfLines={1}>
            {name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            {/* <Text style={styles.subtitleStyle}>{maxMarks} marks</Text> */}
            {/* <Text style={{fontSize: 15}}>{examTime} minutes</Text> */}
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 40,
              flexDirection: 'row',
              marginTop: 20,
            }}>
            {!isEnrolled ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  borderRadius: 50,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#c20202',
                  height: 50,
                }}
                onPress={() =>
                  props.makeTestSeriesPayment(
                    _id,
                    price,
                    timeLimit,
                    name,
                    isPaid,
                  )
                }>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  Enroll {!isPaid ? 'free' : ''}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  borderRadius: 50,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'green',
                  height: 50,
                }}
                onPress={() => props.continueToTest(props.data)}>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  Continue test
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 16}} numberOfLines={1}>
              Valid upto {timeLimit} days
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    height: 300,
    backgroundColor: '#fff',
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 10,
  },
  subtitleStyle: {
    fontSize: 15,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.4)',
    marginRight: 10,
    paddingRight: 10,
  },
});

export default ExamsTemplateCard;
