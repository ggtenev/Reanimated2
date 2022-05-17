import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Svg, { Circle, Rect } from "react-native-svg";

const SIZE = 90;
const CIRCLE_RADIUS = SIZE * 2;

type Props = {};

type ContextType = {
  translateX: number;
  translateY: number;
};

const PanGesture = (props: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const backColor = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
      console.log(Math.ceil(Math.random() * 8));

      backColor.value = withTiming(Math.ceil(Math.random() * 8), {
        duration: 1000,
      });
    },
  });

  const rStyle = useAnimatedStyle((): any => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  }, []);

  const animatedBackground = useAnimatedStyle((): any => {
    return {
      backgroundColor: backColor.value < 5 ? "red" : "blue",
    };
  }, []);

  return (
    <View style={[styles.container, animatedBackground]}>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, rStyle]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,256,0.5)",
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});

export default PanGesture;
