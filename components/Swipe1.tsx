import { AntDesign, Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { snapPoint } from "react-native-redash";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width - 128;
const side = (width + CARD_WIDTH + 100) / 2;
const SNAP_POINTS = [-side, 0, side];
const DURATION = 250;
const QUESTIONS = [];

const Questions: React.FC = (props) => {
  const [position, setPosition] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(10);

  type ContextType = {
    translateX: number;
    translateY: number;
  };

  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.translateX;
      translateY.value = event.translationY + ctx.translateY;
      // console.log(event);
    },
    onEnd: (event, ctx) => {
      console.log(event);

      const dest = snapPoint(translateX.value, event.velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: event.velocityX });
      translateY.value = withSpring(0, { velocity: event.velocityY });
    },
  });

  const rStyle = useAnimatedStyle((): any => {
    return {
      transform: [
        // { perspective: 1500 },
        { rotateX: "30deg" },
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#2C8C8A", "#0BBBB8"]}
          locations={[0.2, 0.5]}
          style={{ flex: 1, padding: "5%" }}
        >
          {/* NAME AND DESCRIPTION */}
          <View style={styles.nameView}>
            <Text style={styles.username}>My name</Text>
            <Text style={styles.questionPara}>
              Agree or disagree with the statements below {"\n"}to get a Speed
              Reading of your personality
            </Text>
          </View>
          {/* STEP INDICATOR */}
          {/* <View style={styles.stepView}>
                        <StepIndicator
                            stepCount={5}
                            customStyles={customStepIndicatorStyles}
                            onPress={(position)=>{setPosition(position)}}
                            currentPosition={position}
                            renderStepIndicator={({ position })=>(
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    {position === 0 && (
                                        <View style={functionalStyles.stepStyle("#EA565B")}></View>
                                    )}
                                    {position === 1 && (
                                        <View style={functionalStyles.stepStyle("#ED7B22")}></View>
                                    )}
                                    {position === 2 && (
                                        <View style={functionalStyles.stepStyle("#EACB4B")}></View>
                                    )}
                                    {position === 3 && (
                                        <View style={functionalStyles.stepStyle("#D8EA4B")}></View>
                                    )}
                                    {position === 4 && (
                                        <View style={functionalStyles.stepStyle("#4CD357")}></View>
                                    )}
                                </View>
                            )}
                            labels={["Strongly Disagree", "Disagree", "Unsure", "Agree", "Strongly Agree"]}
                        />
                    </View> */}
          {/* CARD SHEET */}
          <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View style={[{ flex: 0.45, marginVertical: 20 }, rStyle]}>
              <View style={styles.cardView}>
                <View style={{ width: "80%" }}>
                  <Text style={styles.cardQuestion}>
                    I am naturally more reserved and contained
                  </Text>
                </View>

                <View style={styles.questionBottomBar}></View>

                <View style={styles.handBar}>
                  <View style={{ width: 100, height: 30 }}>
                    <Text>Left</Text>
                  </View>
                  <View style={{ width: 60, height: 70 }}>
                    <Text>Hand</Text>
                  </View>
                  <View style={{ width: 100, height: 30 }}>
                    <Text>Right</Text>
                  </View>
                </View>

                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View style={{ flex: 0.85, paddingRight: 20 }}>
                    <Text style={styles.infoText}>
                      Swipe left or right to make a choice
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </PanGestureHandler>
          {/* AGREE | DISAGREE */}
          <View
            style={{ flex: 0.25, alignItems: "center", flexDirection: "row" }}
          >
            <View style={{ flex: 0.35 }}>
              <TouchableOpacity
                onPress={() => {
                  translateX.value = withSpring(0);
                }}
                style={styles.answerButtomView}
              >
                <AntDesign name="closecircle" color="red" size={20} />
                <Text style={styles.answerText}>Disagree</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.unsureView}>
              <AntDesign name="questioncircle" color="white" size={20} />
              <Text style={styles.unsureText}>Unsure</Text>
            </TouchableOpacity>
            <View style={{ flex: 0.35, alignItems: "flex-end" }}>
              <TouchableOpacity
                style={styles.answerButtomView}
                onPress={() => {}}
              >
                <Ionicons name="checkmark-circle" color="green" size={20} />
                <Text style={styles.answerText}>Agree</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Questions;
const functionalStyles = {
  stepStyle: (color: string): StyleProp<ViewStyle> => {
    return {
      height: 30,
      width: 30,
      borderRadius: 60 / 2,
      backgroundColor: color,
      borderWidth: 0.2,
      borderColor: "black",
    };
  },
};
const customStepIndicatorStyles = {
  stepStrokeCurrentColor: "#fff",
  stepIndicatorCurrentColor: "#fff",
  separatorStrokeFinishedWidth: 2,
  separatorUnFinishedColor: "#fff",
  stepStrokeFinishedColor: "#fff",
  separatorStrokeUnfinishedWidth: 6,
  stepStrokeUnFinishedColor: "#fff",
  stepIndicatorLabelUnFinishedColor: "#fff",
  stepStrokeWidth: 4,
  stepIndicatorUnFinishedColor: "#fff",
  currentStepStrokeWidth: 0,
  labelColor: "#fff",
  labelSize: 12,

  currentStepLabelColor: "#fff",
  currentStepIndicatorLabelFontSize: 15,
};
const styles = StyleSheet.create({
  username: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  questionPara: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  nameView: { flex: 0.2, justifyContent: "space-around" },
  stepView: { flex: 0.2, justifyContent: "center" },
  cardView: {
    width: "95%",
    height: "100%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 9,
    elevation: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  cardQuestion: {
    textAlign: "center",

    fontSize: 18,
  },
  questionBottomBar: {
    width: "90%",
    height: 4,
    backgroundColor: "#0BBBB8",
    borderRadius: 10,
  },
  handBar: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    color: "#C42F7E",

    fontSize: 15,
    textAlign: "center",
  },
  answerButtomView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  answerText: {
    fontSize: 15,
    paddingTop: 5,
  },
  unsureView: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  unsureText: {
    fontSize: 18,
    color: "white",
  },
});
