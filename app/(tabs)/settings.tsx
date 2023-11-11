import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

const ParentsScreen = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(24);

  const [walkPref, setWalkPref] = useState(3);
  const [runPref, setRunPref] = useState(3);
  const [jumpPref, setJumpPref] = useState(3);
  const [dancePref, setDancePref] = useState(3);

  const handleStartChange = (value) => {
    setStartTime(value);
  };

  const handleEndChange = (value) => {
    setEndTime(value);
  };

  const handleJumpPref = (value) => {
    setJumpPref(value);
  };

  const handleRunPref = (value) => {
    setRunPref(value);
  };
  const handleWalkPref = (value) => {
    setWalkPref(value);
  };

  const handleDancePref = (value) => {
    setDancePref(value);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}:00` : `${time}:00`;
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Activity time range:</Text>
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
          Selected Time: {formatTime(startTime)} - {formatTime(endTime)}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Child's activity preferences:</Text>
        <Text>Walking: {walkPref}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={1}
          value={walkPref}
          onValueChange={handleWalkPref}
        />
        <Text>Running: {runPref}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={1}
          value={runPref}
          onValueChange={handleRunPref}
        />
        <Text>Jumping: {jumpPref}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={1}
          value={jumpPref}
          onValueChange={handleJumpPref}
        />
        <Text>Dancing: {dancePref}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={1}
          value={dancePref}
          onValueChange={handleDancePref}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 50
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
    fontSize: 22,
    color: 'black',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
});

export default ParentsScreen;
