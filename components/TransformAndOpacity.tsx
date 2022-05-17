import { StatusBar } from 'expo-status-bar';
import {  useEffect} from 'react';
import { StyleSheet, Text, View, ViewStyle, Button } from 'react-native';
import Animated,{useSharedValue, useAnimatedStyle, AnimatedStyleProp, withTiming, withSpring, withRepeat, RotateOutUpRight} from 'react-native-reanimated'


const SIZE = 100;

const handleRotation = (progrss:Animated.SharedValue<number>) => {
  'worklet'
    return `${ progrss.value *  2 * Math.PI}rad`
}

export default function App() {

  const progrss  = useSharedValue(1)
  const scale  = useSharedValue(1)

  const reanimatedSyle = useAnimatedStyle(() : any => {
    return {
      opacity:progrss.value,
      borderRadius:progrss.value * SIZE/2,
      transform:[
        {scale:scale.value},
        {rotate: handleRotation(progrss) }
      ]
    }
  },[])

  useEffect(() => {
    // progrss.value = withSpring(0)
    //  scale.value = withSpring(2)
  },[]) 
  

  const toggleAnim = () => {
    if(progrss.value == 0){
      progrss.value =  withRepeat(withSpring(1), 3, true) 
       scale.value = withRepeat(withSpring(2 ), 3, true)
    } else {
      progrss.value =  withRepeat(withSpring(0), 3, true) 
       scale.value = withRepeat(withSpring(1 ), 3, true)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    <Animated.View style={[{width:SIZE,height:SIZE, backgroundColor:'blue'},reanimatedSyle]}>

    </Animated.View>
    <View style={{marginTop:120}} > 
    <Button title='Toggle' onPress={toggleAnim} />
    </View>
   
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  