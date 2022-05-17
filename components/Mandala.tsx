import { View, Text, Image, Dimensions, Button } from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolate,
  useAnimatedGestureHandler,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import mandala from "../assets/mandala_EN.png";
import { withBouncing } from "react-native-redash";

import { COLORS } from "../constants/colors";

type Aspects = "Big Picture Thinking" | "Extraverted" | "Inspiration Driven";

export default function Test() {
  const aspect = useSharedValue(0);
  let { width: SIZE } = Dimensions.get("window");

  const anim = useSharedValue(0);
  const rotateAnim = useSharedValue(0);

  const rotation = useDerivedValue(() => {
    return interpolate(anim.value, [0, 360], [0, 360]);
  });

  const rotationB = useDerivedValue(() => {
    return interpolate(rotateAnim.value, [0, 360], [0, 360]);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + "deg" }],
    };
  });
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      console.log(event.translationX);
    },
    onEnd: (event) => {
      if (event.translationX > 25) {
        anim.value = withTiming(anim.value + 45.0);
        aspect.value += 1;
      }
      if (event.translationX < -25) {
        anim.value = withTiming(anim.value - 45.0);
        aspect.value -= 1;
      }
    },
  });

  const qStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotationB.value + "deg" }],
    };
  });

  const backk = () => {
    rotateAnim.value = withTiming(360, { duration: 3000 });
    console.log(aspect.value);
  };
  const forth = () => {
    rotateAnim.value = withTiming(-360, { duration: 3000 });
    console.log(aspect.value);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View
        style={[{ width: 99, height: 99, backgroundColor: "red" }, qStyle]}
      />
      <Button title="run" onPress={() => backk()} />
      <Button title="rev" onPress={() => forth()} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <AnimatedImage
          style={[
            {
              width: SIZE,
              height: SIZE,
              position: "absolute",
              bottom: -SIZE / 2,
            },
            rStyle,
          ]}
          source={mandala}
        />
      </PanGestureHandler>
    </View>
  );
}
