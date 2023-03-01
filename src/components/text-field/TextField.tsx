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
// import icons from '~assets/icons';
import Text1 from '~components/text/text-1/Text1';
import {getSize, WithDesign} from '~utils/system/dimensions';

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
    typeInput,
    textError,
    isSearch = false,
    iconStyle = {},
    secureTextEntry = false,
  } = props;
  const renderRightView = () => {
    if (!editable) {
      return null;
    }

    if (typeInput === 'pass' && value && value.length > 0) {
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
        {isSearch && (
          <Image
            style={[styles.iconSearch, iconStyle]}
            source={icons.ic_search}
            resizeMode="contain"
          />
        )}
        <TextInput
          {...props}
          ref={ref}
          spellCheck={false}
          secureTextEntry={secureTextEntry}
          // secureTextEntry={showText && typeInput === 'pass' ? true : false}
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
    paddingVertical: getSize(15, WithDesign.w),
    fontSize: getSize(16, WithDesign.w),
    fontWeight: '400',
    flex: 1,
    color: systemColors.black,
  },
  container: {
    paddingHorizontal: getSize(20, WithDesign.w),
    borderRadius: getSize(8, WithDesign.w),
    flexDirection: 'row',
    alignItems: 'center',
  },

  stIconPencil: {
    width: 15,
    height: 15,
    tintColor: systemColors.placeholder,
  },
  stTextError: {
    color: systemColors.redEF,
    fontSize: getSize(18, WithDesign.w),
    marginBottom: getSize(16, WithDesign.w),
  },
  iconSearch: {
    width: getSize(32, WithDesign.w),
    height: getSize(32, WithDesign.w),
    tintColor: systemColors.white,
    marginRight: getSize(16, WithDesign.w),
  },
  viewTextWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getSize(25, WithDesign.w),
    marginTop: getSize(4, WithDesign.w),
  },
  containerPressable: {paddingLeft: getSize(20, WithDesign.w)},
});
