import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";

const { height, width: PAGE_WIDTH } = Dimensions.get("window");

const WORDS = ["Hello", "How", "Are", "You?"];

interface PageProps {
  index: number;
  title: string;
  translateX: Animated.SharedValue<number>;
}

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    };
  });
  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          flex: 1,
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
        },
        rStyle,
      ]}
    >
      <Text>{title}</Text>
    </Animated.View>
  );
};

type ContextType = {
  X: number;
};

export default function ScrollViewPan() {
  const translateX = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.X = translateX.value;
    },
    onActive: (event, context) => {
      console.log(event.translationX);
      translateX.value = event.translationX + context.X;
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {WORDS.map((w, i) => {
            return (
              <Page
                translateX={translateX}
                index={i}
                title={w}
                key={i.toString()}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
