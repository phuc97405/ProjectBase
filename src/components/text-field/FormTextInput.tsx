import React, {forwardRef, useState} from 'react';
import {FieldValues, useController} from 'react-hook-form';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {ImageSourcePropType} from 'react-native/types';
import icons from '~assets/icons';
import {systemColors} from '~constans/system-colors';

type textfieldProps = {
  placeholder?: string;
  // errorMessage?: string;
  onSubmitEditing?: any;
  customContainerView: ViewStyle;
  iconHide?: ImageSourcePropType;
  iconShow?: ImageSourcePropType;
  onPress?: () => void;
  // textError?: string;
  isSearch?: boolean;
  iconsStyle?: ImageStyle;
  secureTextEntry?: boolean;
} & FieldValues &
  TextInputProps;
const hitSlop = {bottom: 30, left: 20, right: 20, top: 20};

const FormTextInput = (props: textfieldProps, ref: any) => {
  const [showText, setShowText] = useState(true);

  const {
    control,
    name,
    errorMessage,
    rules,
    customContainerView = {},
    iconHide = icons.ic_hide_pass,
    iconShow = icons.ic_show_pass,
    onPress = () => {
      setShowText(value => !value);
    },
    editable = true,
    value,
    isSearch = false,
    iconStyle = {},
    secureTextEntry = false,
  } = props;
  const {
    field,
    fieldState: {error, invalid},
  } = useController({
    control: control,
    name: name,
    defaultValue: '',
    rules: rules,
  });

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
        {isSearch && (
          <Image
            style={[styles.iconSearch, iconStyle]}
            source={icons.ic_search}
            resizeMode="contain"
          />
        )}
        <TextInput
          {...field}
          {...props}
          ref={ref}
          value={field.value}
          onChangeText={field.onChange}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          editable={editable}
          autoCapitalize="none"
          underlineColorAndroid={'transparent'}
          style={StyleSheet.flatten([styles.stInputText, props.style])}
        />
        {renderRightView()}
      </View>
      {error && <Text style={styles.stTextError}>{errorMessage}</Text>}
    </>
  );
};

export default forwardRef(FormTextInput);

const styles = StyleSheet.create({
  stInputText: {
    paddingVertical: 15,
    fontSize: 16,
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
    tintColor: systemColors.placeHolderBlack,
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
