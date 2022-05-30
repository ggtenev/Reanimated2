import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useCallback, useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import { TouchableOpacity } from "react-native-gesture-handler";

const BACKGROUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const { width, height } = Dimensions.get("window");

const CIRLE_LENGTH = 1000;
const R = CIRLE_LENGTH / (2 * Math.PI);

export default function CircularProgress() {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRLE_LENGTH * (1 - progress.value),
    };
  });

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });
  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  return (
    <View style={styles.container}>
      <ReText style={styles.progressStyle} text={progressText} />

      <Svg style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRLE_LENGTH}
          animatedProps={animatedProps}
        />
      </Svg>
      <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Text style={{ color: "white", fontSize: 22 }}>Press me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
    borderColor: "white",
    borderWidth: 1,
  },
  progressStyle: {
    fontSize: 80,
    color: "rgba(256,256,256,0.7)",
    width: 200,
    textAlign: "center",
  },
  btn: {
    // position: "absolute",
    // bottom: 122,
    width: 155,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33,
    borderWidth: 0.5,
  },
});
