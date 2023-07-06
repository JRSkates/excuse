import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <ImageBackground 
        source={require('./assets/background.jpg')}
        style={styles.backgroundImage}
        >
        <View style={styles.container}>
          <Text style={styles.text}>Excuse</Text>
          <StatusBar backgroundColor="white" barStyle="dark-content" /> 
        <View>
          <Button title="Generate excuse" />
        </View>
        </View>
      </ImageBackground>
    </>
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
  text: {
    color: 'white'
  }
});



