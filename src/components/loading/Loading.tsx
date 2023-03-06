import React from 'react';
import {View, StyleSheet, ActivityIndicator, ColorValue} from 'react-native';
import {systemColors} from '~constans/system-colors';

type LoadingProps = {
  isVisible: boolean;
  size?: number | 'large' | 'small';
  color?: ColorValue;
};

const Loading = ({
  isVisible,
  size = 'large',
  color = systemColors.placeHolderBlack,
}: LoadingProps) => {
  if (isVisible)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={color} size={size} />
      </View>
    );
  return null;
};

export default Loading;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
    zIndex: 999,
  },
});
