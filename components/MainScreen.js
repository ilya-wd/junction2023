import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import SensorFusionProvider from '../context/expo-sensor-fusion.js';
import PositionProvider from '../context/PositionContext.js';
import ExerciseProvider, { useExercise } from '../context/ExerciseContext.js';

export default function MainScreen() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [level, setLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState(0.6);
  const [companionName, setCompanionName] = useState('Companion');
  const [dialog, setDialog] = useState('');
  const [buttonsVisibility, setButtonsVisibility] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [gameStartedMoving, setGameStartedMoving] = useState(false);
  const [gameMotivationShown, setGameMotivationShown] = useState(false);
  const [gameMovingTime, setGameMovingTime] = useState(0);

  const resetGame = () => {
    setGameStartTime(Date.now());
    setGameStartedMoving(false);
    setGameMotivationShown(false);
    resetSval();
  };

  const { exercising, sval, resetSval } = useExercise();

  if (gameMode) {
    const elapsedTime = Date.now() - gameStartTime;

    if (!gameStartedMoving && sval > 800) {
      setDialog('Good! Keep moving!');
      setGameMotivationShown(false);
      setGameStartedMoving(true);
      setGameMovingTime(Date.now());
    }

    if (!gameStartedMoving && !gameMotivationShown && elapsedTime > 5000) {
      setDialog("C'mon! Let's jump!");
      setGameMotivationShown(true);
    }

    if (gameStartedMoving) {
      const timeSinceMoving = Date.now() - gameMovingTime;
      if (timeSinceMoving > 10000) {
        setDialog('Well done!');
        setGameMode(false);
      }
    }
  }

  const handleCompanionTap = () => {
    setDialog("Let's jump!");
    setButtonsVisibility(true);
  };

  const handleJumpAccept = () => {
    setDialog('');
    setButtonsVisibility(false);
    setGameMode(true);
    resetGame();
  };

  const handleJumpDecline = () => {
    setDialog('');
    setButtonsVisibility(false);
  };

  const handleGameStop = () => {
    setDialog('');
    setGameMode(false);
  };

  return (
    <LinearGradient colors={['#71D552', '#C9D2BD', '#A0C1CA']} style={{ flex: 1 }}>
      {dialog != '' && (
        <View
          id="dialog-bubble"
          style={{
            marginTop: windowHeight * 0.25,
            backgroundColor: '#F6F6F6',
            borderRadius: 30,
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            width: windowWidth * 0.6,
          }}
        >
          <Text style={{ color: '#425456', fontSize: 24, fontWeight: 700 }}>
            {dialog}
          </Text>
          <Image
            id="dialog-bubble-tail"
            style={{
              width: windowWidth * 0.6,
              alignSelf: 'center',
              position: 'absolute',
              marginTop: 25,
              zIndex: 100,
              resizeMode: 'contain',
            }}
            source={require('../assets/dialog-bubble-tail.png')}
          />
        </View>
      )}
      <View
        id="companion-level"
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          position: 'absolute',
          marginTop: windowHeight * 0.1,
          display: 'flex',
          flexDirection: 'column',
          width: windowWidth * 0.72,
        }}
      >
        <Text
          style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 700, marginBottom: 25 }}
        >
          Level {level}
        </Text>
        <View
          id="companion-level-bar"
          style={{
            borderWidth: 8,
            borderRadius: 8,
            alignSelf: 'stretch',
            borderColor: 'rgba(0, 0, 0, 0.15)',
          }}
        ></View>
        <View
          id="companion-level-bar-current"
          style={{
            borderWidth: 8,
            borderRadius: 8,
            alignSelf: 'stretch',
            borderColor: '#ffffff',
            width: windowWidth * 0.72 * levelProgress,
            marginTop: -16,
          }}
        ></View>
        <View
          id="companion-level-bar-current-point"
          style={{
            borderWidth: 10,
            borderRadius: 10,
            alignSelf: 'stretch',
            borderColor: '#ffffff',
            width: 0,
            marginTop: -18,
            marginLeft: -17 + windowWidth * 0.72 * levelProgress,
          }}
        ></View>
      </View>
      {!gameMode && (
        <TouchableOpacity
          onPress={handleCompanionTap}
          style={{ alignSelf: 'center', position: 'absolute' }}
        >
          <Image
            id="companion-picture"
            style={{
              width: windowWidth * 0.6,
              marginTop: windowWidth * 0.85,
              zIndex: 100,
              height: windowHeight * 0.3,
              resizeMode: 'contain',
            }}
            source={require('../assets/companion.png')}
          />
        </TouchableOpacity>
      )}
      {gameMode && (
        <Image
          id="companion-picture"
          style={{
            width: windowWidth,
            alignSelf: 'center',
            position: 'absolute',
            marginTop: windowWidth * 0.65,
            zIndex: 100,
            height: windowHeight * 0.4,
            resizeMode: 'contain',
          }}
          source={require('../assets/companion-jumping.gif')}
        />
      )}
      <View
        id="companion-data"
        style={{
          marginTop: windowWidth * 1.5,
          backgroundColor: '#F9F9F9',
          flexGrow: 1,
          borderTopLeftRadius: windowWidth * 0.1,
          borderTopRightRadius: windowWidth * 0.1,
          alignItems: 'center',
          paddingTop: windowWidth * 0.07,
          paddingLeft: windowWidth * 0.05,
          paddingRight: windowWidth * 0.05,
        }}
      >
        <Text style={{ color: '#425456', fontSize: 24, fontWeight: 700 }}>
          {companionName}
        </Text>
        <View
          id="horizontal-line"
          style={{
            borderWidth: 1,
            alignSelf: 'stretch',
            borderColor: 'rgba(0, 0, 0, 0.15)',
            marginTop: 5,
            marginBottom: 30,
          }}
        ></View>
        {buttonsVisibility && (
          <View
            id="buttons"
            style={{
              flexGrow: 1,
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: windowWidth * 0.05,
              paddingRight: windowWidth * 0.05,
            }}
          >
            <TouchableOpacity
              onPress={handleJumpAccept}
              style={{
                backgroundColor: '#3A5683',
                padding: 10,
                borderRadius: 20,
                margin: 10,
                marginBottom: 30,
              }}
            >
              <Text style={styles.yesButton}>Yes!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleJumpDecline}
              style={{
                backgroundColor: '#FF1212',
                padding: 10,
                borderRadius: 20,
                margin: 10,
                marginBottom: 30,
              }}
            >
              <Text style={{ color: 'white', fontSize: 25, textAlign: 'center' }}>
                Maybe later
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {gameMode && (
          <View
            id="game-buttons"
            style={{
              flexGrow: 1,
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: windowWidth * 0.05,
              paddingRight: windowWidth * 0.05,
            }}
          >
            <TouchableOpacity
              onPress={handleGameStop}
              style={{
                backgroundColor: '#FF1212',
                padding: 10,
                borderRadius: 30,
                margin: 10,
                marginBottom: 40,
                marginBottom: 30,
                width: 60,
              }}
            >
              <Text style={{ color: 'white', fontSize: 25, textAlign: 'center' }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  yesButton: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    borderRadius: 10,
  },
});
