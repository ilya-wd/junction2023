import { StyleSheet, Text, View } from 'react-native';
import { useRef, useState } from 'react';
import SensorFusionProvider from '../../context/expo-sensor-fusion.js';
import PositionProvider from '../../context/PositionContext.js';
import ExerciseProvider from '../../context/ExerciseContext.js';
import MainScreen from '../../components/MainScreen.js'

export default function TabOneScreen() {
  return (
    <SensorFusionProvider><PositionProvider><ExerciseProvider>
      <MainScreen/>
    </ExerciseProvider></PositionProvider></SensorFusionProvider>
  );
}
