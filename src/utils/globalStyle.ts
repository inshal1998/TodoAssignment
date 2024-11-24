import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts} from './constants';

const globalStyles = StyleSheet.create({
  flexOne: {
    flex: 1,
    backgroundColor: Colors.white,
    padding:20
  },
  alignContentCenter:{
    justifyContent:'center',
    alignItems:'center',
  },
  largeIconBtn: {
    width: Dimensions.get('screen').width / 1.3,
    height: Dimensions.get('screen').height / 5,
    borderRadius: 25,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 14,
  },
  largeBtnTxt: {
    ...Fonts.poppinsBold24,
    color: Colors.white,
    marginTop: 20,
  },

  rowContainerWithSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  textColumn: {
    flexDirection: 'column',
  },
  listingBottomContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});

export default globalStyles;
