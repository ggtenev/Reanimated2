import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { FC, useState, useCallback } from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

const TITLES = [
  "Record somethin cool",
  "Make sure it is worth it",
  "Don't be afraid",
  "Believe in yourself",
  "Still issues",
  "Not sure when",
];
const { width: screenWidth } = Dimensions.get("window");
const TRANSLATE_X_TRESHOLD = -screenWidth * 0.4;
const BACK_COLOR = "#FAFBFF";

interface TaskInterface {
  title: string;
  index: number;
}
interface ListItemIntefrace {
  task: TaskInterface;
  onDismiss: (task: TaskInterface) => void;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const ListItem: FC<ListItemIntefrace> = ({ task, onDismiss }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(70);
  const marginVertical = useSharedValue(10);
  const opacityV = useSharedValue(1);
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_TRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withSpring(-screenWidth);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacityV.value = withTiming(0, undefined, (finished) => {
          if (finished) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_TRESHOLD ? 1 : 0);
    return {
      opacity,
      height: itemHeight.value,
    };
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const rTaskContainer = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacityV.value,
    };
  });

  return (
    <Animated.View style={[styles.taskContainer, rTaskContainer]}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5 name="trash-alt" size={35} color="red" />
      </Animated.View>
    </Animated.View>
  );
};

export default function SwipeToDelete() {
  const [tasks, setTasks] = useState(TASKS);
  const onDismiss = useCallback((task: TaskInterface) => {
    let tempTasks = tasks.filter((t) => t.index !== task.index);

    setTasks(tempTasks);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Tasks</Text>
      <ScrollView>
        {tasks.map((task, idx) => {
          return <ListItem onDismiss={onDismiss} key={idx} task={task} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",

    backgroundColor: BACK_COLOR,
  },
  title: {
    padding: "5%",
    fontSize: 60,
    marginVertical: 20,
  },
  task: {
    width: "90%",
    height: 70,
    backgroundColor: "white",

    justifyContent: "center",
    paddingLeft: 20,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
  },
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "10%",
    zIndex: -1,
  },
});
