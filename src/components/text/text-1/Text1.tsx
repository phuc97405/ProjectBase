import React from 'react';
import {StyleSheet} from 'react-native';
import {systemColors} from '~constans/system-colors';
import {BaseText, BaseTextProps} from '../base-text/BaseText';

export default (props: BaseTextProps): JSX.Element => {
  const cusProps = {...props};
  cusProps.style = [styles.text, cusProps.style];
  return <BaseText {...cusProps}>{props.children}</BaseText>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 25,
    color: systemColors.black,
  },
});
