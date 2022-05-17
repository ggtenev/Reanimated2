import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import React, { useRef } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";

const { width: SIZE } = Dimensions.get("window");

export default function DoubleTap() {
  const tapRef = useRef();
  const btnRef = useRef();
  return (
    <View style={styles.container}>
      <TapGestureHandler
        ref={tapRef}
        numberOfTaps={2}
        onActivated={() => console.log("hello")}
      >
        <Image style={styles.image} source={require("../assets/karten.jpeg")} />
      </TapGestureHandler>
      <Button title="check ref" onPress={() => console.log(tapRef.current)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
});
