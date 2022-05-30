import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

export default function GestureHandler2() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const gestureH = Gesture.Pan()
    .onBegin((event) => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    });

  const followX = useDerivedValue(() => {
    return withSpring(translateX.value);
  });
  const followY = useDerivedValue(() => {
    return withSpring(translateY.value);
  });
  const followXA = useDerivedValue(() => {
    return withSpring(followX.value);
  });
  const followYA = useDerivedValue(() => {
    return withSpring(followY.value);
  });
  const followXB = useDerivedValue(() => {
    return withSpring(followXA.value);
  });
  const followYB = useDerivedValue(() => {
    return withSpring(followYA.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: followX.value }, { translateY: followY.value }],
    };
  });
  const rStyleA = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: followXA.value },
        { translateY: followYA.value },
      ],
    };
  });
  const rStyleB = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: followXB.value },
        { translateY: followYB.value },
      ],
    };
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gestureH}>
        <Animated.View style={[styles.circle, rStyle, { zIndex: 1000 }]} />
      </GestureDetector>
      <Animated.View
        style={[styles.circle, rStyleA, { backgroundColor: "red" }]}
      />
      <Animated.View
        style={[styles.circle, rStyleB, { backgroundColor: "green" }]}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 80,
    aspectRatio: 1,
    backgroundColor: "blue",
    borderRadius: 40,
    position: "absolute",
  },
});
