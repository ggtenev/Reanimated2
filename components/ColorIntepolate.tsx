import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Button,
  Switch,
  Dimensions,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  AnimatedStyleProp,
  withTiming,
  withSpring,
  withRepeat,
  runOnUI,
  interpolateColor,
  interpolateColors,
  useDerivedValue,
} from "react-native-reanimated";

const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0,0,0,0.1)",
};

type Theme = "light" | "dark";

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");
  //   const progress = useSharedValue(0);

  const progress = useDerivedValue(() => {
    return theme === "dark"
      ? withTiming(1, { duration: 400 })
      : withTiming(0, { duration: 400 });
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );

    return { backgroundColor };
  });
  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );

    return { backgroundColor };
  });
  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );

    return { color };
  });

  const sayHello = (who: string) => {
    "worklet";
    console.log(`Hello from ${who} ${Platform.OS}`);
  };

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <StatusBar style="auto" />
      <Animated.Text style={[styles.text, rTextStyle]}>TEXT</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          thumbColor={"violet"}
          trackColor={SWITCH_TRACK_COLOR}
          value={theme === "dark"}
          onValueChange={(toggled) => setTheme(toggled ? "dark" : "light")}
        />
      </Animated.View>
      <Button
        title="tttt"
        onPress={() => {
          runOnUI(sayHello)("George");
        }}
      />
    </Animated.View>
  );
}

const SIZE = Dimensions.get("window").width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZE / 2,
    shadowColor: "grey",
    elevation: 7,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  text: {
    fontSize: 70,
    textTransform: "uppercase",
    letterSpacing: 14,
    fontWeight: "bold",
    marginVertical: 33,
  },
});
