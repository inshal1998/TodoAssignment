import {StyleSheet} from 'react-native';
import {Colors, Fonts} from './constants';

const globalStyles = StyleSheet.create({
  flexOne: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  alignContentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediumTextStyle: {
    ...Fonts.poppinsRegular16,
    fontSize: 14,
    color: Colors.black,
  },
  largeTxtStyle: {
    ...Fonts.poppinsRegular16,
    paddingTop: 4,
    fontSize: 15,
    color: Colors.semiDarkBlack,
  },
  largeTxtBoldStyle: {
    ...Fonts.poppinsBold16,
    paddingTop: 4,
    fontSize: 15,
    color: Colors.semiDarkBlack,
  },
  smallTxtStyle: {
    ...Fonts.poppinsRegular08,
    paddingTop: 4,
    fontSize: 11,
    color: Colors.lightBlack,
  },
});

export default globalStyles;
