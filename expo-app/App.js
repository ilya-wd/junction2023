import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useRef, useState } from 'react';
import SensorFusionProvider, { useSensorFusion, useCompass, toDegrees } from './context/expo-sensor-fusion.js';
import PositionProvider from './context/PositionContext.js';
import ExerciseProvider, { useExercise } from './context/ExerciseContext.js';

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
  const g = 9.8
  const acc_bias = useRef([0, 0, 0, 0]);
  const bias_counter = useRef(0);
  const bias_period = 40;
  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 0, 0]);
  const { ahrs, accl } = useSensorFusion();
  const attitude = ahrs.getQuaternion();

  const lastUpdate = useRef(0);
  const currentTime = Date.now()
  const elapsedTime = currentTime - lastUpdate.current
  lastUpdate.current = currentTime
  const dt = (elapsedTime / 1000)

  const hpr = ([a1, b1, c1, d1], [a2, b2, c2, d2]) => {
    return [
      a1*a2 - b1*b2 - c1*c2 - d1*d2,
      a1*b2 + b1*a2 + c1*d2 - d1*c2,
      a1*c2 - b1*d2 + c1*a2 + d1*b2,
      a1*d2 + b1*c2 - c1*b2 + d1*a2, 
    ]
  }

  const att_q = [attitude.w, -attitude.x, -attitude.y, -attitude.z]
  const att_pr_q = [attitude.w, attitude.x, attitude.y, attitude.z]
  const acc_q = [0, ...accl]

  const accl_rot = hpr(att_pr_q, hpr(acc_q, att_q)).map(_ => _*g)

  if(bias_counter.current < bias_period) {
    acc_bias.current = acc_bias.current.map((v, i) => v + accl_rot[i]);
    bias_counter.current++;
    if(bias_counter.current == bias_period) {
      velocity.current = [0, 0, 0]
      position.current = [0, 0, 0]
      acc_bias.current = acc_bias.current.map((v, i) => v / bias_period);
    }
  } 

  const accl_unb = accl_rot.map((val, i) => val - acc_bias.current[i])
  
  position.current = position.current.map((v, i) => v + velocity.current[i] * dt + 0.5*accl_unb[i + 1] * (dt**2))
  velocity.current = velocity.current.map((v, i) => v + accl_unb[i + 1] *  dt)

  return (
    <Text>
      Raw acceleration:{'\n'}
      X: {accl[0]}{'\n'}
      Y: {accl[1]}{'\n'}
      Z: {accl[2]}{'\n'}

      {'\n'}

      Rotated acceleration:{'\n'}
      X: {accl_rot[1]}{'\n'}
      Y: {accl_rot[2]}{'\n'}
      Z: {accl_rot[3]}{'\n'}

      {'\n'}

      Unbiased acceleration:{'\n'}
      X: {accl_unb[1]}{'\n'}
      Y: {accl_unb[2]}{'\n'}
      Z: {accl_unb[3]}{'\n'}

      {'\n'}

      Velocity:{'\n'}
      X: {velocity.current[0]}{'\n'}
      Y: {velocity.current[1]}{'\n'}
      Z: {velocity.current[2]}{'\n'}

      {'\n'}

      POsition:{'\n'}
      X: {position.current[0]}{'\n'}
      Y: {position.current[1]}{'\n'}
      Z: {position.current[2]}{'\n'}

      {'\n'}

      {elapsedTime}{'\n'}
    </Text>
  );
};

const ExerciseIndicator = () => {
  const { exercising } = useExercise();
  
  return (
    <Text>
      You are exercising: {exercising ? "yes" : "no"}
    </Text>
  );
};

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
