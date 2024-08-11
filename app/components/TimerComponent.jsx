import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';


const TimerComponent = () => {
  const [remainingTime, setRemainingTime] = useState(0);



  const startTimer = async () => {
    const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
    await AsyncStorage.setItem('targetTime', targetTime.toString());
    checkTimer(); // Update remaining time immediately
  };

  const checkTimer = async () => {
    const targetTimeStr = await AsyncStorage.getItem('targetTime');
    if (!targetTimeStr) return; // No timer set
    const targetTime = parseInt(targetTimeStr, 10);
    const currentTime = new Date().getTime();
    const timeLeft = targetTime - currentTime;

    if (timeLeft <= 0) {
      // Timer has ended
      setRemainingTime(0);
      // Here you could clear the stored targetTime or handle the end of the timer
    } else {
      // Update state with remaining time
      setRemainingTime(timeLeft);
    }
  };

  // Convert remaining time in milliseconds to a readable format
  const formatRemainingTime = () => {
    if (remainingTime <= 0) return "00:00:00";
    let seconds = Math.floor(remainingTime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    checkTimer();
    // Optionally, set up a periodic check here or in a background task
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Remaining Time: {formatRemainingTime()}</Text>
      <Button title="Start 24-Hour Timer" onPress={startTimer} />
    </View>
  );
};

export default TimerComponent;
