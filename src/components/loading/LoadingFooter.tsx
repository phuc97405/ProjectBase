import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {systemColors} from '~constans/system-colors';

interface Props {
  isShow: boolean;
}

const LoadingFooter = ({isShow}: Props) => {
  // const {isShow = true} = props;
  if (isShow)
    return (
      <View style={styles.ctLoading}>
        <ActivityIndicator size="small" color={systemColors.mainColor} />
      </View>
    );
  return null;
};
export default LoadingFooter;
const styles = StyleSheet.create({
  ctLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
});
