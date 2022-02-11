import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {IconStyles} from '../../../Styles';
import RenderHtml from 'react-native-render-html';
import {CheckBox, Icon} from 'react-native-elements';

const ExamBody = ({
  currentQuestion,
  selectOption,
  isChecked,
  width,
  changeLanguageHandler,
}) => {
  return (
    <ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Icon
          name="language"
          size={25}
          onPress={() =>
            changeLanguageHandler(
              currentQuestion.language,
              currentQuestion.questionNumber,
            )
          }
          raised
          color="rgba(20, 93, 160,0.6)"
          type={IconStyles.iconType}
        />
      </View>
      <View style={{margin: 5}}>
        <RenderHtml
          contentWidth={width}
          source={{
            html: currentQuestion.questionTitle,
          }}
        />
      </View>
      <View style={{paddingVertical: 20}}>
        {currentQuestion.options.length !== 0
          ? currentQuestion.options.map((value) => {
              return (
                <View
                  key={value._id}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{width: '90%'}}>
                    <CheckBox
                      containerStyle={{
                        backgroundColor: '#fff',
                        borderWidth: 0,
                        borderBottomWidth: 1,
                      }}
                      key={value._id}
                      title={value.optionTitle}
                      onPress={() => selectOption(value)}
                      checked={isChecked === value._id ? true : false}
                    />
                  </View>
                  <Text>
                    {currentQuestion?.answeredOption?._id === value._id ? (
                      <Icon
                        name="checkmark-circle-outline"
                        size={25}
                        color="rgba(20, 93, 160,0.6)"
                        type={IconStyles.iconType}
                      />
                    ) : null}
                  </Text>
                </View>
              );
            })
          : null}
      </View>
    </ScrollView>
  );
};

export default ExamBody;
