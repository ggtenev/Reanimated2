import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useCallback } from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  max,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const CC = Object.values(COLORS);

const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";
const { width } = Dimensions.get("window");
const PICKER_WIDTH = width * 0.9;
const CIRLE_PICKER_SIZE = 45;
const CIRCLE_SIZE = width * 0.8;
const INTERNAL_PICKER_SIZE = CIRLE_PICKER_SIZE / 2;

interface ColorPickerProps extends LinearGradientProps {
  maxWidth: number;
  onColorChanged?: (color: string | number) => void;
}

const ColorPickerComponent: React.FC<ColorPickerProps> = ({
  colors,
  start,
  end,
  style,
  maxWidth,
  onColorChanged,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const adjustTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(0, translateX.value),
      maxWidth - CIRLE_PICKER_SIZE
    );
  });

  type ContextType = {
    x: number;
    y: number;
  };

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, ctx) => {
      ctx.x = adjustTranslateX.value;

      //   translateY.value = withSpring(-CIRLE_PICKER_SIZE);
      //   scale.value = withSpring(1.2);
    },
    onActive: (event, ctx) => {
      console.log(event.translationX);

      translateX.value = event.translationX + ctx.x;
    },
    onEnd: (_, ctx) => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });

  const pickerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustTranslateX.value },
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    };
  });

  const internalPickerStyle = useAnimatedStyle(() => {
    const inputRange = CC.map((_, idx) => {
      return ((idx + 1) / CC.length) * maxWidth;
    });
    const backColor = interpolateColor(translateX.value, inputRange, CC);
    onColorChanged?.(backColor);
    return {
      backgroundColor: backColor,
    };
  });

  const tapGestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: (event) => {
        translateY.value = withSpring(-CIRLE_PICKER_SIZE);
        scale.value = withSpring(1.2);
        translateX.value = withTiming(event.absoluteX - CIRLE_PICKER_SIZE);
      },
      onEnd: (event) => {
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
      },
    });

  return (
    <TapGestureHandler onGestureEvent={tapGestureHandler}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[{ justifyContent: "center" }]}>
            <LinearGradient
              colors={colors}
              start={start}
              end={end}
              style={style}
            />
            <Animated.View style={[styles.picker, pickerStyle]}>
              <Animated.View
                style={[styles.internalPicker, internalPickerStyle]}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default function ColorPicker() {
  const pickedColor = useSharedValue<string | number>(CC[0]);

  const onColorChanged = useCallback((color: string | number) => {
    "worklet";
    pickedColor.value = color;
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPickerComponent
          onColorChanged={onColorChanged}
          maxWidth={PICKER_WIDTH}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 40,
            width: PICKER_WIDTH,
            borderRadius: 20,
            zIndex: 1,
          }}
          colors={CC}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    position: "absolute",
    backgroundColor: "#fff",
    width: CIRLE_PICKER_SIZE,
    height: CIRLE_PICKER_SIZE,
    borderRadius: CIRLE_PICKER_SIZE / 2,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  internalPicker: {
    position: "absolute",
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderRadius: CIRLE_PICKER_SIZE / 2,
    borderWidth: 0.1,
    borderColor: "rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
});
