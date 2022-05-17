import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

import { COLORS } from "../constants/colors";
const { width } = Dimensions.get("window");
const SCREEN_WIDTH = width;

interface Props {
  title: string;
  aspect: number;
}
const AspectButton: React.FC<Props> = ({ title, aspect }) => {
  let backColor: string | undefined;
  console.log(width);

  switch (aspect) {
    case 0:
      backColor = COLORS.inspiration_driven;
      break;
    case 1:
      backColor = COLORS.big_picture_thinking;
      break;
    case 2:
      backColor = COLORS.extraverted;
      break;
    case 3:
      backColor = COLORS.outcome_focussed;
      break;
    case 4:
      backColor = COLORS.discipline_driven;
      break;
    case 5:
      backColor = COLORS.down_to_earth;
      break;
    case 6:
      backColor = COLORS.introverted;
      break;
    case 7:
      backColor = COLORS.people_focussed;
      break;
  }
  if (backColor == undefined) {
    return null;
  }

  return (
    <View style={[styles.btn, { backgroundColor: backColor }]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: SCREEN_WIDTH / 3.9,
    height: SCREEN_WIDTH / 12,
    borderRadius: 45,
    paddingHorizontal: 3,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderWidth: 0.4,
    borderColor: "grey",
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  text: {
    color: "white",
    fontSize: width > 666 ? 18 : 12,
    textAlign: "center",
  },
});

export default AspectButton;
