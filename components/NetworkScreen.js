import { View, Text, Dimensions, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native"
import { useRef, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import SensorFusionProvider from '../context/expo-sensor-fusion.js';
import PositionProvider from '../context/PositionContext.js';
import ExerciseProvider, { useExercise } from '../context/ExerciseContext.js';
import * as Haptics from 'expo-haptics';

const serverURL = "https://alice-and-bob-play-a-game.onrender.com"

export default function NetworkScreen() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [level, setLevel] = useState(1);
    const [levelProgress, setLevelProgress] = useState(0.6);
    const [companionName, setCompanionName] = useState("Companion")
    const [dialog, setDialog] = useState("")
    const [buttonsVisibility, setButtonsVisibility] = useState(true)
    const [inputField, setInputField] = useState('');
    const [joinMode, setJoinMode] = useState(false)
    const [startMode, setStartMode] = useState(false)
    const [gameMode, setGameMode] = useState(false)
    const [gameUserID, setGameUserID] = useState('')
    const [gameCode, setGameCode] = useState('')
    const [gameStartTime, setGameStartTime] = useState(0)
    const [gameStartedMoving, setGameStartedMoving] = useState(false)
    const [gameMotivationShown, setGameMotivationShown] = useState(false)
    const [awaitingResult, setAwaitingResult] = useState(false)
    const { sval, resetSval } = useExercise();

    const resetGame = () => {
        setGameStartTime(Date.now());
        setGameStartedMoving(false);
        setGameMotivationShown(false);
        setAwaitingResult(false);
        resetSval();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    const finishGame = (s=0, report=false) => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
        )
        console.log(`${gameUserID}: submitting score ${Math.floor(s)}`)
        if(!report) {
            setGameMode(false);
            setButtonsVisibility(true);
        }

        fetch(`${serverURL}/completeGame/${gameCode}?user_id=${gameUserID}&score=${Math.floor(s)}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if(report) {
                    console.log('Finished the game, won:', data.won);
                    if(data.won) {
                        setDialog("You won!");
                    } else {
                        setDialog("You lost. Better luck next time!");
                    }
                }
            })
            .catch(error => {
                console.error('Error during fetch:', error.message, error);
            })
            .finally(() => {
                setGameMode(false);
                setButtonsVisibility(true);
            });
    }


    if(gameMode) {
        const elapsedTime = Date.now() - gameStartTime

        if(!gameStartedMoving && sval > 800) {
            setDialog("Good! Keep moving!");
            setGameMotivationShown(false);
            setGameStartedMoving(true)
        }
            
        if(!gameStartedMoving && !gameMotivationShown && elapsedTime > 5000) {
            setDialog("C'mon! Let's move!");
            setGameMotivationShown(true);
        }

        if(elapsedTime > 10000) {
            setDialog("Well done!");
            setGameMode(false);
            finishGame(sval, true);
        }
    }

    const handleStartGame = () => {
        setButtonsVisibility(false);
        setDialog("")
        fetch(`${serverURL}/createGame`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                console.log('Game Code:', data.gameCode);
                setStartMode(true);
                setDialog(`Game code is ${data.gameCode}`);
                setGameCode(data.gameCode)
                fetch(`${serverURL}/joinGame/${data.gameCode}`, { method: 'POST' })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Joined game, user id:', data.userId);
                        setGameUserID(data.userId);
                        resetGame();
                        setStartMode(false);
                        setGameMode(true);
                    })
                    .catch(error => {
                        console.error('Error during fetch:', error.message, error);
                    });
            })
            .catch(error => {
                console.error('Error during fetch:', error.message, error);
              });
    }

    const handleCancelStart = () => {
        setDialog("")
        setButtonsVisibility(true);
        setStartMode(false);
    }

    const handleJoinGame = () => {
        setButtonsVisibility(false);
        setJoinMode(true);
        setInputField("")
        setDialog("")
    }

    const handleInputChange = (inputText) => {
        setInputField(inputText);
    };    

    const handleJoinConnect = () => {
        setJoinMode(false);
        console.log(inputField);
        setGameCode(inputField)
        fetch(`${serverURL}/joinGame/${inputField}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                console.log('Joined game, user id:', data.userId);
                setGameUserID(data.userId);
                resetGame();
                setGameMode(true);
            })
            .catch(error => {
                console.error('Error during fetch:', error.message, error);
            });
    }

    const handleCancelJoin = () => {
        setButtonsVisibility(true);
        setJoinMode(false);
    }

    const handleGameStop = () => {
        setDialog("");
        finishGame();
        setGameMode(false);
    }

    return (
        <LinearGradient colors={['#71D552', '#C9D2BD', '#A0C1CA']} style={{ flex: 1 }} >
            { dialog != "" && <View id="dialog-bubble" style={{
                marginTop: windowHeight * 0.25 ,
                backgroundColor: '#F6F6F6',
                borderRadius: 30,
                alignItems: 'center',
                alignSelf: 'center', 
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                width: windowWidth * 0.6
                }}
            >
                <Text style= {{ color: '#425456', fontSize: 24, fontWeight: 700 }}>{dialog}</Text>
                <Image id="dialog-bubble-tail" style={{
                    width: windowWidth * 0.6, 
                    alignSelf: 'center', 
                    position: 'absolute', 
                    marginTop: 30,  
                    zIndex: 100, 
                    resizeMode: 'contain'
                }} source={require('../assets/dialog-bubble-tail.png')} />
            </View> }
            {joinMode && <View id="dialog-bubble" style={{
                marginTop: windowHeight * 0.25 ,
                backgroundColor: '#F6F6F6',
                borderRadius: 30,
                alignItems: 'center',
                alignSelf: 'center', 
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                width: windowWidth * 0.3
                }}
            >
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: 'gray',
                            borderWidth: 1,
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                        placeholder="Code"
                        onChangeText={handleInputChange}
                        value={inputField}
                    />
                </KeyboardAvoidingView> 
            </View>}
            <View id="companion-level" style={{ 
                alignItems: 'center',
                alignSelf: 'center', 
                position: 'absolute',
                marginTop: windowHeight * 0.1 ,
                display: 'flex',
                flexDirection: 'column',
                width: windowWidth * 0.72
                }}
            >
                <Text style= {{ color: '#FFFFFF', fontSize: 24, fontWeight: 700, marginBottom: 25 }}>Level {level}</Text>
                <View id="companion-level-bar" style={{ borderWidth: 8, borderRadius: 8, alignSelf: 'stretch', borderColor: 'rgba(0, 0, 0, 0.15)' }}></View>
                <View id="companion-level-bar-current" style={{ borderWidth: 8, borderRadius: 8, alignSelf: 'stretch', borderColor: '#ffffff', width: windowWidth * 0.72 * levelProgress, marginTop: -16 }}></View>
                <View id="companion-level-bar-current-point" style={{ borderWidth: 10, borderRadius: 10, alignSelf: 'stretch', borderColor: '#ffffff', width: 0, marginTop: -18, marginLeft: -17 + windowWidth * 0.72 * levelProgress }}></View>
            </View>
            {!gameMode && 
                <Image id="companion-picture" style={{
                    width: windowWidth * 0.6,   
                    alignSelf: 'center', 
                    position: 'absolute',
                    marginTop: windowWidth * 0.85, 
                    zIndex: 100, 
                    height: windowHeight * 0.3,
                    resizeMode: 'contain'
                    }} source={require('../assets/companion.png')} />
            }
            {gameMode && 
                <Image id="companion-picture" style={{
                    width: windowWidth,
                    alignSelf: 'center', 
                    position: 'absolute',   
                    marginTop: windowWidth * 0.65, 
                    zIndex: 100, 
                    height: windowHeight * 0.4,
                    resizeMode: 'contain'
                    }} source={require('../assets/jump-together.gif')} />
            }
            <View id="companion-data" style={{ 
                marginTop: windowWidth * 1.5, 
                backgroundColor: '#F9F9F9', 
                flexGrow: 1, 
                borderTopLeftRadius: windowWidth * 0.1, 
                borderTopRightRadius: windowWidth * 0.1,
                alignItems: 'center',
                paddingTop: windowWidth * 0.07,
                paddingLeft: windowWidth * 0.05,
                paddingRight: windowWidth * 0.05
                }}
            >
                <Text style={{ color: '#425456', fontSize: 24, fontWeight: 700 }}>{companionName}</Text>
                <View id="horizontal-line" style={{ borderWidth: 1, alignSelf: 'stretch', borderColor: 'rgba(0, 0, 0, 0.15)', marginTop: 5, marginBottom: 30 }}></View>
                {buttonsVisibility && <View id="buttons" style={{   
                    flexGrow: 1, 
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: windowWidth * 0.05,
                    paddingRight: windowWidth * 0.05
                    }}
                >
                    <TouchableOpacity onPress={handleStartGame} style={{
                        backgroundColor: '#3A5683',
                        padding: 10,
                        borderRadius: 20,
                        margin: 10,
                        marginBottom: 30,
                    }}>
                        <Text style={{color: 'white', fontSize: 25, textAlign: 'center',}}>Start game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleJoinGame} style={{
                        backgroundColor: '#3A5683',
                        padding: 10,
                        borderRadius: 20,
                        margin: 10,
                        marginBottom: 30,
                    }}>
                        <Text style={{color: 'white', fontSize: 25, textAlign: 'center',}}>Join game</Text>
                    </TouchableOpacity>
                </View> }
                {joinMode && <View id="joiner" style={{   
                    flexGrow: 1, 
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: windowWidth * 0.05,
                    paddingRight: windowWidth * 0.05
                    }}
                >   
                    <TouchableOpacity onPress={handleJoinConnect} style={{
                        backgroundColor: '#3A5683',
                        padding: 10,
                        borderRadius: 20,
                        margin: 10,
                        marginBottom: 30,
                    }}>
                        <Text style={{color: 'white', fontSize: 25, textAlign: 'center',}}>Join</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelJoin} style={{
                        backgroundColor: '#FF1212',
                        padding: 10,
                        borderRadius: 20,
                        margin: 10,
                        marginBottom: 30,
                    }}>
                        <Text style={{color: 'white', fontSize: 25, textAlign: 'center',}}>Cancel</Text>
                    </TouchableOpacity>
                </View> }
                {startMode && <View id="starter" style={{   
                    flexGrow: 1, 
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: windowWidth * 0.05,
                    paddingRight: windowWidth * 0.05
                    }}
                >   
                    <TouchableOpacity onPress={handleCancelStart} style={{
                        backgroundColor: '#FF1212',
                        padding: 10,
                        borderRadius: 20,
                        margin: 10,
                        marginBottom: 30,
                    }}>
                        <Text style={{color: 'white', fontSize: 25, textAlign: 'center',}}>Cancel</Text>
                    </TouchableOpacity>
                </View> }
                {gameMode && <View id="game-buttons" style={{   
                    flexGrow: 1, 
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: windowWidth * 0.05,
                    paddingRight: windowWidth * 0.05
                    }}
                >
                    <TouchableOpacity onPress={handleGameStop} style={{
                        backgroundColor: '#FF1212',
                        padding: 10,
                        borderRadius: 20,
                        margin: 10,
                        marginBottom: 30,
                    }}>
                        <Text style={{color: 'white', fontSize: 25, textAlign: 'center',}}>X</Text>
                    </TouchableOpacity>
                </View> }
            </View>
        </LinearGradient>
    );
}