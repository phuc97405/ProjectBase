import React, {forwardRef, useState} from 'react';
import {ImageStyle} from 'react-native';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  TextInputProps,
  ImageSourcePropType,
  ViewStyle,
  Text,
} from 'react-native';
import icons from '~assets/icons';
import Text1 from '~components/text/text-1/Text1';
import {systemColors} from '~constans/system-colors';

export enum InputTextError {
  EMAIL_E = 'Email is not empty',
  EMAIL_I = 'Invalid email format',
  PHONE_E = 'Phone Number is not empty',
  PHONE_I = 'Invalid Phone Number format',
}

const hitSlop = {bottom: 30, left: 20, right: 20, top: 20};
type textfieldProps = {
  customContainerView?: ViewStyle;
  iconHide?: ImageSourcePropType;
  iconShow?: ImageSourcePropType;
  onPress?: () => void;
  typeInput?: string;
  textError?: string;
  isSearch?: boolean;
  iconStyle?: ImageStyle;
  secureTextEntry?: boolean;
} & TextInputProps;

const TextField = (props: textfieldProps, ref: any): any => {
  const [showText, setShowText] = useState(true);

  const {
    customContainerView = {},
    iconHide = icons.ic_hide_pass,
    iconShow = icons.ic_show_pass,
    onPress = () => {
      setShowText(value => !value);
    },
    editable = true,
    value,
    textError,
    isSearch = false,
    iconStyle = {},
    secureTextEntry = false,
  } = props;
  const renderRightView = () => {
    if (!editable) {
      return null;
    }

    if (value && value.length > 0) {
      return (
        <Pressable
          style={styles.containerPressable}
          hitSlop={hitSlop}
          onPress={onPress}>
          <Image
            source={!showText ? iconShow : iconHide}
            resizeMode="contain"
            style={styles.stIconPencil}
          />
        </Pressable>
      );
    }
  };

  return (
    <>
      <View style={[styles.container, customContainerView]}>
        <TextInput
          {...props}
          ref={ref}
          spellCheck={false}
          secureTextEntry={showText && secureTextEntry}
          autoCorrect={false}
          editable={editable}
          autoCapitalize="none"
          underlineColorAndroid={'transparent'}
          style={StyleSheet.flatten([styles.stInputText, props.style])}
        />
        {renderRightView()}
      </View>
      {textError ? (
        <Text1 fontType={2} regular style={styles.stTextError}>
          {textError}
        </Text1>
      ) : null}
    </>
  );
};
export default forwardRef(TextField);

const styles = StyleSheet.create({
  stInputText: {
    paddingVertical: 15,
    fontSize: 15,
    fontWeight: '400',
    flex: 1,
    color: systemColors.black,
  },
  container: {
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  stIconPencil: {
    width: 15,
    height: 15,
    tintColor: systemColors.greyBg,
  },
  stTextError: {
    color: systemColors.red,
    fontSize: 18,
    marginBottom: 16,
  },
  iconSearch: {
    width: 32,
    height: 32,
    tintColor: systemColors.white,
    marginRight: 16,
  },
  viewTextWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    marginTop: 4,
  },
  containerPressable: {paddingLeft: 20},
});
