import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useRef, useState } from 'react';
import SensorFusionProvider, { useSensorFusion, useCompass, toDegrees } from './context/expo-sensor-fusion.js';
import PositionProvider, { usePosition } from './context/PositionContext.js';
import ExerciseProvider, { useExercise } from './context/ExerciseContext.js';

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState('#fff');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const Indicator = () => {
    const { ahrs } = useSensorFusion();
    const { heading, pitch, roll } = ahrs.getEulerAngles();
    const compass = useCompass();
    return (
      <Text>
        Heading: {toDegrees(heading)}°{'\n'}
        Pitch: {toDegrees(pitch)}°{'\n'}
        Roll: {toDegrees(roll)}°{'\n'}
        Compass: {toDegrees(compass)}°{'\n'}
        {'\n'}
      </Text>
    );
  };
  
  const PathIndicator = () => {
    const { accl } = useSensorFusion();
    const { position, velocity } = usePosition();
    
    return (
      <Text>
        Raw acceleration:{'\n'}
        X: {accl[0]}{'\n'}
        Y: {accl[1]}{'\n'}
        Z: {accl[2]}{'\n'}
  
        {'\n'}
  
        Velocity:{'\n'}
        X: {velocity[0]}{'\n'}
        Y: {velocity[1]}{'\n'}
        Z: {velocity[2]}{'\n'}
  
        {'\n'}
  
        Position:{'\n'}
        X: {position[0]}{'\n'}
        Y: {position[1]}{'\n'}
        Z: {position[2]}{'\n'}
  
        {'\n'}
      </Text>
    );
  };
  
  const ExerciseIndicator = () => {
    const { exercising, sval } = useExercise();
  
    if(exercising) { setBackgroundColor("#0f0"); }
    else { setBackgroundColor("#fff"); }

    console.log(sval)
    
    return (
      <Text>
        You are exercising: {exercising ? "yes" : "no"}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text>
      <SensorFusionProvider> <PositionProvider> <ExerciseProvider>
        <Text> <Indicator /> </Text>
        <Text> <PathIndicator /> </Text>
        <Text>  <ExerciseIndicator />  </Text>
      </ExerciseProvider> </PositionProvider> </SensorFusionProvider>
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
