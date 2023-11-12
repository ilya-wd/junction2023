import { View, Text, Dimensions, Image } from "react-native"
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

function CompanionStatistic({ barColor, goalNumber, currentNumber, title, goalAdditionalText }) {
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%'}}>
            <View id="title-and-number-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4 }}>
                <Text style={{ color: '#425456', fontSize: 16, fontWeight: 600 }}>{title}</Text>
                <Text style={{ color: '#425456', fontSize: 16, fontWeight: 600 }}>{currentNumber} / {goalNumber}{goalAdditionalText ? ' ' + goalAdditionalText : ''}</Text>
            </View>
            <View id="bar-container">
                <View id="companion-level-bar" style={{ borderWidth: 8, borderRadius: 8, alignSelf: 'stretch', borderColor: barColor, opacity: 0.3 }}></View>
                <View id="companion-level-bar-current" style={{ borderWidth: 8, borderRadius: 8, alignSelf: 'stretch', borderColor: barColor, width: currentNumber / goalNumber * 100 + '%', marginTop: -16 }}></View>
                <View id="companion-level-bar-current-point" style={{ borderWidth: 10, borderRadius: 10, alignSelf: 'stretch', borderColor: barColor, width: 0, marginTop: -18, marginLeft: -5 + currentNumber / goalNumber * 100 + '%' }}></View>
            </View>
        </View>
    );
}

export default function CompanionProfileScreen() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [level, setLevel] = useState(1);
    const [levelProgress, setLevelProgress] = useState(0.6);
    const [companionName, setCompanionName] = useState("Companion")

    const achievements = [
        'walked 10000 steps',
        'exercised 7 days in a row',
        'slept 8 hours for a week',
    ]

    return (
        <LinearGradient colors={['#71D552', '#C9D2BD', '#A0C1CA']} style={{ flex: 1 }}>
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
            <Image id="companion-picture" style={{
                width: windowWidth * 0.6, 
                alignSelf: 'center', 
                position: 'absolute', 
                marginTop: windowWidth * 0.55, 
                zIndex: 100, 
                height: windowHeight * 0.3,
                resizeMode: 'contain'
                }} source={require('../assets/companion.png')} />
            <View id="companion-data" style={{ 
                marginTop: windowWidth, 
                backgroundColor: '#F9F9F9', 
                flexGrow: 1, 
                borderTopLeftRadius: windowWidth * 0.1, 
                borderTopRightRadius: windowWidth * 0.1,
                alignItems: 'center',
                paddingTop: windowWidth * 0.25,
                paddingLeft: windowWidth * 0.05,
                paddingRight: windowWidth * 0.05
                }}
            >
                <Text style={{ color: '#425456', fontSize: 24, fontWeight: 700 }}>{companionName}</Text>
                <View id="horizontal-line" style={{ borderWidth: 1, alignSelf: 'stretch', borderColor: 'rgba(0, 0, 0, 0.15)', marginTop: 5, marginBottom: 30 }}></View>

                <View id="horizontal-stats" style={{ gap: windowWidth * 0.05, alignSelf: 'stretch' }}>
                    <CompanionStatistic barColor={'#1087BA'} goalNumber="100" currentNumber="41" title="Jumps" />
                    <CompanionStatistic barColor={'#736AB3'} goalNumber="60" currentNumber="30" title="Fresh air" goalAdditionalText="min" />
                    <CompanionStatistic barColor={'#40B17D'} goalNumber="8000" currentNumber="3285" title="Steps" />
                </View>
            </View>
        </LinearGradient>
    );
}