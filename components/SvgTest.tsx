import { View, Text, StyleSheet, PanResponderGestureState } from "react-native";
import React from "react";
import Svg, { Circle, Rect } from "react-native-svg";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

export default function SvgTest() {
  const trX = useSharedValue(0);
  const trY = useSharedValue(0);

  type ContextType = {
    x: number;
    y: number;
  };

  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (e, ctx) => {
      (ctx.x = trX.value), (ctx.y = trY.value);
    },
    onActive: (e, ctx) => {
      console.log(e);

      trX.value = e.translationX + ctx.x;
      trY.value = e.translationY + ctx.y;
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: trX.value }, { translateY: trY.value }],
    };
  });

  return (
    <View style={stles.container}>
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View
          style={[
            {
              width: 222,
              height: 222,
              borderColor: "grey",
              borderWidth: 1,
            },
            rStyle,
          ]}
        >
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="blue"
              strokeWidth="2.5"
              fill="green"
            />
            <Rect
              x="15"
              y="15"
              width="70"
              height="70"
              stroke="red"
              strokeWidth="2"
              fill="yellow"
            />
          </Svg>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const stles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
