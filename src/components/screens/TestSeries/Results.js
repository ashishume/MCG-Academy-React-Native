import React from 'react';
import RenderHtml from 'react-native-render-html';
import {
  TouchableOpacity,
  FlatList,
  View,
  useWindowDimensions,
  Text,
} from 'react-native';

const Results = (props) => {
  const {params} = props.route;
  console.log(params[0]);
  const {width} = useWindowDimensions();
  return (
    <View style={{margin: 5}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Correct Answers</Text>
      <FlatList
        data={params}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 2,
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Q {item.questionNumber}
              </Text>
              <View
                style={{
                  marginBottom: 5,
                  backgroundColor: 'rgba(44, 97, 211,0.2)',
                }}>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: item.solutionExplanation,
                  }}
                />
              </View>
              <View style={{backgroundColor: 'rgba(24, 127, 41,0.2)'}}>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: item.solutionExplanation,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Results;
