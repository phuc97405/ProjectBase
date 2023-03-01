import {Dimensions, Platform} from 'react-native';
// import {indexOf} from 'lodash';

const designW = 540;
const designH = 1170;

export enum WithDesign {
  w = 'w',
  h = 'h',
}

const remarkableIOSVersion = 13.0;
const CORE_RATIO = 667 / 375;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// const getSize = (value: number, design?: WithDesign) => {
//   switch (design) {
//     case WithDesign.h:
//       return Math.round((screenHeight * value) / designH);
//     case WithDesign.w:
//       if (screenWidth > designW) return value;
//       return Math.round((screenWidth * value) / designW);
//     default:
//       return Math.round(
//         ((screenHeight / screenWidth) * value) / (designH / designW),
//       );
//   }
// };

const screenScale = CORE_RATIO / (screenHeight / screenWidth);
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;
const width = (num: number) => screenWidth * (num / 100);
const height = (num: number) => screenHeight * (num / 100);
const scale = (size: number) => (screenWidth / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (screenHeight / guidelineBaseHeight) * size;
const heightScale = (num: number) => screenHeight * ((num * screenScale) / 100);
const widthScale = (num: number) => screenWidth * ((num * screenScale) / 100);
const isIOS = Platform.OS === 'ios';
const enabledFormSheet =
  isIOS && parseFloat(Platform.Version as string) >= remarkableIOSVersion;
const isIphoneX = isIOS && (screenWidth >= 812 || screenHeight >= 812);
const numberWithCommas = (x: string | number, defaultValue: string = '0') => {
  if (!x) return defaultValue;
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
const numberOrCharacter = (x: string) => {
  if (!x) return '';
  return x.toString().replace(/[^a-zA-Z0-9@]+/, '');
};
export {
  isIOS,
  scale,
  width,
  height,
  widthScale,
  screenWidth,
  heightScale,
  screenHeight,
  verticalScale,
  enabledFormSheet,
  isIphoneX,
  //   getSize,
  numberWithCommas,
  numberOrCharacter,
};
