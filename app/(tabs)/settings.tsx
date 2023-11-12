import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

const ParentsScreen = () => {
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(21);

  const [stepPref, setWalkPref] = useState(5000);
  const [jumpPref, setJumpPref] = useState(70);
  const [freshAirPref, setFreshAirPref] = useState(60);

  const handleStartChange = (value) => {
    setStartTime(value);
  };

  const handleEndChange = (value) => {
    setEndTime(value);
  };

  const handleJumpPref = (value) => {
    setJumpPref(value);
  };

  const handleStepPref = (value) => {
    setWalkPref(value);
  };

  const handleFreshAirPref = (value) => {
    setFreshAirPref(value);
  }

  const formatTime = (time) => {
    return time < 10 ? `0${time}:00` : `${time}:00`;
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Activity time range</Text>
        <View style={styles.sliderContainer}>
          <Text>Start Time: {formatTime(startTime)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={24}
            step={1}
            value={startTime}
            onValueChange={handleStartChange}
            upperLimit={endTime}
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text>End Time: {formatTime(endTime)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={24}
            step={1}
            value={endTime}
            onValueChange={handleEndChange}
            lowerLimit={startTime}
          />
        </View>

        <Text style={startTime === endTime ? styles.disabledTime : styles.enabledTime}>
          The game will interact with your child within this time range: {formatTime(startTime)} - {formatTime(endTime)}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Child's activity preferences:</Text>

        <Text>Number of steps per day: {stepPref}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1000}
          maximumValue={10000}
          step={500}
          value={stepPref}
          onValueChange={handleStepPref}
        />

        <Text>Jumping: {jumpPref}</Text>
        <Slider
          style={styles.slider}
          minimumValue={50}
          maximumValue={200}
          step={5}
          value={jumpPref}
          onValueChange={handleJumpPref}
        />
        <Text>Time on frsh air in minutes: {freshAirPref}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={300}
          step={30}
          value={freshAirPref}
          onValueChange={handleFreshAirPref}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#F9F9F9'
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  enabledTime: {
    fontSize: 18,
    color: 'black',
  },
  disabledTime: {
    fontSize: 18,
    color: 'grey',
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
  },
  heading: {
    fontSize: 24,
    color: '#425456',
    fontWeight: 700,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
});

export default ParentsScreen;
