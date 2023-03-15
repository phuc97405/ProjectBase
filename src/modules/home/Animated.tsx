import React from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

const Animateded = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: _ => {
      x.value = withSpring(60);
      y.value = withSpring(0);
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {translateY: y.value},
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </PanGestureHandler>
  );
  // <>
  //   <Animated.View style={[styles.box, animatedStyles]} />
  //   <Button
  //     onPress={() => {
  //       offset.value = withSpring(Math.random() * 255);
  //     }}
  //     title="Move"
  //   />
  // </>
};
export default Animateded;
const styles = StyleSheet.create({
  box: {
    backgroundColor: 'red',
    height: 100,
    width: 100,
  },
});
