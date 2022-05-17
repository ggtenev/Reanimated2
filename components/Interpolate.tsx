import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Button,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  AnimatedStyleProp,
  withTiming,
  withSpring,
  withRepeat,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const SIZE = width * 0.75;
const WORDS = [
  "Hello",
  "How",
  "Are",
  "You?",
  "Hope",
  "You",
  "Are",
  "Doing",
  "Good",
];

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle((): any => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  const rTextStyle = useAnimatedStyle((): any => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -(height / 2)],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-1, 1, -1],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });
  return (
    <View
      style={[
        styles.pageContainer,
        {
          backgroundColor: `rgba(${Math.round(
            Math.random() * 255
          )},${Math.round(Math.random() * 255)},${Math.round(
            Math.random() * 255
          )},0.4)`,
        },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default function App() {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log(event.contentOffset.x);

    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      pagingEnabled
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.container}
    >
      {WORDS.map((w, idx) => {
        return (
          <Page
            translateX={translateX}
            index={idx}
            title={w}
            key={idx.toString()}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pageContainer: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,252,0.4)",
  },
  text: {
    fontSize: 70,
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
