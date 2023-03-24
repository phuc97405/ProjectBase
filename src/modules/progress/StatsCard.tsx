import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

interface Props {
  total: number;
  progress: number;
  color?: string;
  backgroundColor?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
  animDelay?: number;
  animDuration?: number;
  testID?: string;
  borderRadius?: number;
  containerHeight?: number;
  onAnimationDidEnd?: () => void;
}

const ProgressBarInternal = () => {
  const translateX = useSharedValue(0);

  const translateXStyle = useAnimatedStyle(() => {
    return {
      width: withSequence(
        withTiming(translateX.value, {duration: 3000}),
        withTiming(0, {duration: 2000}),
      ),
      // withRepeat(
      //   withTiming(
      //     translateX.value,
      //     {
      //       duration: 3000,
      //     },
      //     (finished, currenValue) => {
      //       console.log('fished', finished);
      //       console.log('curren', currenValue);
      //     },
      //   ),
      //   2,
      //   true,
      //   finished => {
      //     const result = finished ? 'all repeat success' : 'false';
      //   },
      // ),
    };
  }, []);

  return (
    <View
      onTouchEnd={() => {
        translateX.value = 300;
      }}
      style={[styles.container]}>
      <Animated.View style={[styles.bar, translateXStyle]} />
    </View>
  );
};

export default ProgressBarInternal;

const styles = StyleSheet.create({
  bar: {
    height: '100%',
    backgroundColor: 'grey',
  },
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: 300,
    height: 30,
    borderRadius: 10,
    borderWidth: 0.5,
  },
});
