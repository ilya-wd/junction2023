import { StyleSheet } from 'react-native';
import CompanionProfile from './CompanionProfile';


export default function App() {
  return (
    <CompanionProfile />
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
