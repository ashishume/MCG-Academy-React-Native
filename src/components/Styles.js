import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  fontFamily: {
    fontFamily: 'Kodchasan-Regular',
  },
  cardBorder: {
    borderWidth: 0,
    borderRadius: 10,
    borderColor: '#fff',
  },
  PrimaryButton: {
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
});

export const IconStyles = {
  iconColor: '#6b42e5',
  iconType: 'ionicon',
  iconSize: 26,
};
