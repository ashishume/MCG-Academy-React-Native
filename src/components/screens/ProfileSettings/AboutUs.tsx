import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const AboutUs = (props) => {
  return (
    <ScrollView>
      <Text style={{textAlign: 'justify', margin: 20, fontSize: 20}}>
        MCG ACADEMY IT ESTABLISHED ON 07 MARCH 2017, BY - PRAMOD SINGH, our
        motive is to provide the cheapest education for every student of the
        world. AFTER THREE YEAR In June 2020, The domain name, Website and the
        Apps are owned, registered and operated by RAWAT BROTHERS EDUCATION LLP,
        a private company incorporated under the (Indian) Companies Act, 2013,
        and having its registered office at SWAMI VIVEKANAND CHAURAHA,
        GOPALPURA, THATIPUR GWALIOR
      </Text>
    </ScrollView>
  );
};

export default AboutUs;
