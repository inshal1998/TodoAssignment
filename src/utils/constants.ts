import {TextStyle} from 'react-native';

const Colors = {
  primaryColor: '#0484fc',
  white: '#fff',
  black: '#000',
  lightBlack: 'rgba(0,0,0,0.5)',
  semiDarkBlack:"#000000A0",
  emerald_green:"#2ECC71",
  medium_sea_green:"#4CAF50",
  coral_red:'#FF6F61',
  gray_600:'#9E9E9E'
};

export const generateUniqueId = () => {
  const timestampPart = Date.now() % 10000;
  const randomPart = Math.floor(Math.random() * 100);
  return `${timestampPart}${randomPart}`.padStart(4, '0');;
};

const Fonts = {
  poppinsMedium08: <TextStyle>{
    fontFamily: 'Poppins-Medium',
    fontSize: 8,
  },
  poppinsMedium16: <TextStyle>{
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  poppinsMedium24: <TextStyle>{
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
  },
  poppinsMedium32: <TextStyle>{
    fontFamily: 'Poppins-Medium',
    fontSize: 32,
  },

  poppinsRegular08: <TextStyle>{
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
  },
  poppinsRegular16: <TextStyle>{
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  poppinsRegular24: <TextStyle>{
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
  },
  poppinsRegular32: <TextStyle>{
    fontFamily: 'Poppins-Regular',
    fontSize: 32,
  },
  poppinsBold16: <TextStyle>{
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  poppinsBold24: <TextStyle>{
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  poppinsBold32: <TextStyle>{
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
  },
};

export {Colors, Fonts};
