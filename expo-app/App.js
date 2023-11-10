import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SensorFusionProvider, { useSensorFusion, useCompass, toDegrees } from './expo-sensor-fusion.js';
import { useRef, useState } from 'react';

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
    </Text>
  );
};

const PathIndicator = () => {
  const interval = 50;
  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 0, 0]);
  const { ahrs, accl } = useSensorFusion();
  const attitude = ahrs.getQuaternion();

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

  const accl_rot = hpr(att_pr_q, hpr(acc_q, att_q)).map(_ => _*9.8)
  accl_rot[3] = accl_rot[3] - 9.8
  
  velocity.current = velocity.current.map((val, i) => val + accl_rot[i + 1] * (1000 / interval) )

  return (
    <Text>
      Raw acceleration:
      X: {accl[0]}{'\n'}
      Y: {accl[1]}{'\n'}
      Z: {accl[2]}{'\n'}

      Rotated acceleration:
      X: {accl_rot[1]}{'\n'}
      Y: {accl_rot[2]}{'\n'}
      Z: {accl_rot[3]}{'\n'}

      Velocity:
      X: {velocity.current[0]}{'\n'}
      Y: {velocity.current[1]}{'\n'}
      Z: {velocity.current[2]}{'\n'}
    </Text>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text> <SensorFusionProvider> <Indicator /> </SensorFusionProvider> </Text>
      <Text> <SensorFusionProvider> <PathIndicator /> </SensorFusionProvider> </Text>
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
