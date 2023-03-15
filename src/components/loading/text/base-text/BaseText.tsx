// import { systemColors } from '@constants/system-colors';
// import { FONTS } from '@constants/system-fonts';
import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {systemColors} from '~constans/system-colors';
import {FONTS} from '~constans/system-fonts';
// import {FONTS} from '../../../constants/system-fonts';

export interface BaseTextProps {
  bold?: boolean;
  semiBold?: boolean;
  regular?: boolean;
  medium?: boolean;
  extraBold?: boolean;
  children: any;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  suppressHighlighting?: boolean;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  onPress?: () => void;
  adjustsFontSizeToFit?: boolean;
  fontType: number;
}
export const BaseText = ({
  children,
  bold,
  regular = true,
  medium,
  numberOfLines,
  style,
  suppressHighlighting,
  ellipsizeMode,
  onPress,
  adjustsFontSizeToFit = false,
  fontType = 1,
}: BaseTextProps): JSX.Element => {
  const customStyle: TextStyle = {
    color: systemColors.black,
  };

  switch (fontType) {
    case 1: // roboto
      if (regular) {
        customStyle.fontFamily = FONTS.RobotoBold;
      }
      if (bold) {
        customStyle.fontFamily = FONTS.RobotoBold;
      }
      if (medium) {
        customStyle.fontFamily = FONTS.RobotoBold;
      }
      break;
    case 2: // nanum
      if (regular) {
        // customStyle.fontFamily = FONTS.NanumBarunGothic;
      }
      if (bold) {
        // customStyle.fontFamily = FONTS.NanumBarunGothicBold;
      }
    default:
      break;
  }

  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      onPress={onPress}
      style={[customStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      suppressHighlighting={suppressHighlighting}>
      {children}
    </Text>
  );
};
