import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, ViewStyle, Button } from "react-native";
import TransformAndOpacity from "./components/TransformAndOpacity";
import PanGesture from "./components/PanGestureHandler";
import Interpolate from "./components/Interpolate";
import ColorInterpolate from "./components/ColorIntepolate";
import Swipe1 from "./components/Swipe1";
import PinchGesture from "./components/PinchGesture";
import GestureHandler2 from "./components/GestureHandler2";
import DoubleTap from "./components/DoubleTap";
import Mandala from "./components/Mandala";
import SvgTest from "./components/SvgTest";
import ScrollViewPan from "./components/ScrollViewPan";
import PerfectCircle from "./components/PerfectCircle";
import ColorPicker from "./components/ColorPicker";
import CircularProgress from "./components/CircularProgress";
import SwipeToDelete from "./components/SwipeToDelete";

export default function App() {
  return <SwipeToDelete />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
