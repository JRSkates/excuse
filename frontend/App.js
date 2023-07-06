import React, { useState } from "react";
import { ImageBackground, StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider, Text, Button } from "native-base";
import { Video } from 'expo-av';

export default function App() {
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const handleButtonPress = () => {
    setVideoPlaying(true);
  };

  return (
    <NativeBaseProvider>
      {!isVideoPlaying ? (
        <ImageBackground
          source={require('./assets/background.png')}
          style={styles.backgroundImage}
        >
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <View style={styles.container}>
            <Button onPress={handleButtonPress}>Generate excuse</Button>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.videoContainer}>
          <Video
            source={require('./assets/loading.mp4')} // Replace with the path to your video file
            style={styles.video}
            resizeMode="cover"
            isLooping
            shouldPlay
          />
        </View>
      )}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
});