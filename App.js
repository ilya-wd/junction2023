import { StyleSheet, Text } from 'react-native';
import CompanionProfile from './CompanionProfile';
import MainScreen from './MainScreen';
import SensorFusionProvider from './context/expo-sensor-fusion.js';
import PositionProvider from './context/PositionContext.js';
import ExerciseProvider from './context/ExerciseContext.js';

export default function App() {
  return (
    <SensorFusionProvider> <PositionProvider> <ExerciseProvider>
      <MainScreen />
    </ExerciseProvider> </PositionProvider> </SensorFusionProvider>
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
