import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolate,
  useAnimatedGestureHandler,
  withSpring,
  withRepeat,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import mandala from "../assets/Mandala.png";
const { width } = Dimensions.get("window");
const SCREEN_WIDTH = width - 15;

import AspectButton from "../bits/AspectButton";
import { JumpingTransition } from "react-native-reanimated";
import { COLORS } from "../constants/colors";

interface Props {
  initialAspect: number;
}

export default function PerfectCircle({ initialAspect }: Props) {
  const [aspectOnJs, setAspectOnJS] = useState(0);
  const [BackColor, setbackgroudnCOlor] = useState("");
  const aspectR = useSharedValue(0);
  const anim = useSharedValue(0);

  useEffect(() => {
    switch (initialAspect) {
      case 0:
        anim.value = 0;
        aspectR.value = 0;
        setAspectOnJS(0);
        break;
      case 1:
        anim.value = -45;
        aspectR.value = 1;
        setAspectOnJS(1);
        break;
      case 2:
        anim.value = -90;
        aspectR.value = 2;
        setAspectOnJS(2);
        break;
      case 3:
        anim.value = -135;
        aspectR.value = 3;
        setAspectOnJS(3);
        break;
      case 4:
        anim.value = -180;
        aspectR.value = 4;
        setAspectOnJS(4);
        break;
      case 5:
        anim.value = -225;
        aspectR.value = 5;
        setAspectOnJS(5);
        break;
      case 6:
        anim.value = -270;
        aspectR.value = 6;
        setAspectOnJS(6);
        break;
      case 7:
        anim.value = -315;
        aspectR.value = 7;
        setAspectOnJS(7);
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    switch (aspectOnJs) {
      case 0:
        setbackgroudnCOlor(COLORS.inspiration_driven);
        break;
      case 1:
        setbackgroudnCOlor(COLORS.big_picture_thinking);
        break;
      case 2:
        setbackgroudnCOlor(COLORS.extraverted);
        break;
      case 3:
        setbackgroudnCOlor(COLORS.outcome_focussed);
        break;
      case 4:
        setbackgroudnCOlor(COLORS.discipline_driven);
        break;
      case 5:
        setbackgroudnCOlor(COLORS.down_to_earth);
        break;
      case 6:
        setbackgroudnCOlor(COLORS.inspiration_driven);
        break;
      case 7:
        setbackgroudnCOlor(COLORS.people_focussed);
        break;
    }
  }, [aspectOnJs]);

  const rotation = useDerivedValue(() => {
    return interpolate(anim.value, [0, 360], [0, 360]);
  });

  const animationColor = useDerivedValue<any>(() => {
    // return interpolateColor(
    //   aspectR.value,
    //   [0, 1, 2, 3, 4, 5, 6, 7],
    //   [
    //     COLORS.inspiration_driven,
    //     COLORS.big_picture_thinking,
    //     COLORS.extraverted,
    //     COLORS.outcome_focussed,
    //     COLORS.discipline_driven,
    //     COLORS.down_to_earth,
    //     COLORS.introverted,
    //     COLORS.people_focussed,
    //   ]
    // );
  });

  const backGroundAnim = useAnimatedStyle(() => {
    // return {s
    //   backgroundColor: withTiming(animationColor.value),
    // };
    const backColor = interpolateColor(
      aspectR.value,
      [0, 1, 2, 3, 4, 5, 6, 7],
      [
        COLORS.inspiration_driven,
        COLORS.big_picture_thinking,
        COLORS.extraverted,
        COLORS.outcome_focussed,
        COLORS.discipline_driven,
        COLORS.down_to_earth,
        COLORS.introverted,
        COLORS.people_focussed,
      ]
    );
    return { backgroundColor: backColor };
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + "deg" }],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (event) => {
      //   console.log(event.translationX);
    },
    onEnd: (event) => {
      if (event.translationX > 25) {
        // aspectChanger(aspectR.value + 1);
        anim.value = withTiming(anim.value + 45.0, { duration: 500 });
        if (aspectR.value == 0) {
          aspectR.value = 7;
        } else {
          aspectR.value -= 1;
        }
      }
      if (event.translationX < -25) {
        // aspectChanger(aspectR.value + 1);
        anim.value = withTiming(anim.value - 45.0, { duration: 500 });

        if (aspectR.value == 7) {
          aspectR.value = 0;
        } else {
          aspectR.value += 1;
        }
      }
    },
    onFinish: () => {
      runOnJS(setAspectOnJS)(aspectR.value);
    },
  });

  return (
    // <Animated.View style={[styles.container, backGroundAnim, { opacity: 1 }]}>
    <LinearGradient
      colors={["rgba(255,255,255,0)", BackColor]}
      style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}
    >
      {/* <View style={[{ width: 100, height: 100 }, backGroundAnim]}></View> */}
      <Text>{aspectOnJs}</Text>
      <Button title="aspect" onPress={() => console.log(aspectR.value)} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={rStyle}>
          <Image
            source={mandala}
            style={{
              width: Dimensions.get("window").width * 0.9,
              height: Dimensions.get("window").width * 0.9,
            }}
          />
          {/* <AspectButton title="Inspiration Driven" aspect={0} /> */}
          <View
            style={{
              //   borderRadius:
              //     Math.round(
              //       Dimensions.get("window").width + Dimensions.get("window").height
              //     ) / 2,
              width: Dimensions.get("window").width * 0.9,
              height: Dimensions.get("window").width * 0.9,
              //   borderWidth: 5,
              borderColor: "red",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
            // underlayColor = '#ccc'
          >
            <TouchableOpacity
              style={{
                // height: 50,
                // width: 50,
                position: "absolute",
                bottom: Dimensions.get("window").width * 0.78,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AspectButton
                title="Inspiration Driven"
                aspect={0}
                //   source={require("../assets/favicon.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // height: 50,
                // width: 50,
                position: "absolute",
                bottom: Dimensions.get("window").width * 0.66,
                right: width > 666 ? 50 : 25,

                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "45deg" }],
              }}
            >
              <AspectButton title="Big Picture Thinking" aspect={1} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // height: 50,
                // width: 50,
                position: "absolute",
                bottom: Dimensions.get("window").width * 0.66,
                left: width > 666 ? 40 : 20,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "-45deg" }],
              }}
            >
              <AspectButton title="People Focused" aspect={7} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // height: 50,
                // width: 50,
                position: "absolute",
                top: Dimensions.get("window").width * 0.78,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: aspectR.value == 4 ? "180deg" : "0deg" }], // normally 0
              }}
            >
              <AspectButton title="Discipline Driven" aspect={4} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                // height: 50,
                // width: 50,
                position: "absolute",
                top: Dimensions.get("window").width * 0.66,
                right: width > 666 ? 50 : 20,
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  { rotate: aspectR.value == 3 ? "135deg" : "-45deg" },
                ],
              }}
            >
              <AspectButton title="Outcome Focused" aspect={3} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // height: 50,
                // width: 50,
                position: "absolute",
                top: Dimensions.get("window").width * 0.66,
                left: width > 666 ? 50 : 22,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "-135deg" }], //Normally 45deg
              }}
            >
              <AspectButton title="Down to Earth" aspect={5} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // height: 50,
                // width: 50,
                position: "absolute",
                bottom: Dimensions.get("window").width * 0.4,
                left: width > 666 ? -40 : -20,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "-90deg" }],
              }}
            >
              <AspectButton title="Introverted" aspect={6} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // height: 50,
                // width: 50,

                position: "absolute",
                bottom: Dimensions.get("window").width * 0.4,
                right: width > 666 ? -40 : -20,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "90deg" }],
              }}
            >
              <AspectButton aspect={2} title="Extraverted" />
            </TouchableOpacity>
          </View>
          {/* <Image
        style={{ height: SCREEN_WIDTH, width: SCREEN_WIDTH }}
        source={mandala}
      /> */}
        </Animated.View>
      </PanGestureHandler>
      {/* </Animated.View> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
