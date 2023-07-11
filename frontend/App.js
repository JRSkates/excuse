import React, { useState } from "react";
import { ImageBackground, StyleSheet, View, StatusBar, Share, KeyboardAvoidingView, ScrollView, Switch} from "react-native";
import { NativeBaseProvider, Text, Button, Input, Box } from "native-base";
import axios from 'axios';

export default function App() {
  const [excuse, setExcuse] = useState('')
  const [excuseGenerated, setExcuseGenerated] = useState(false);
  const [typeInput, setTypeInput] = useState('')
  const [switchState, setSwitchState] = useState(false);

  const generateExcuse = async () => {
    try {
      console.log('click')
      const response = await axios.get(`https://excuse-s1se.onrender.com/excuse`, { 
        params:{
          eventType: typeInput
        }
      })
      setTypeInput('');
      const data = response.data;

      setExcuse(data.excuse);
      setExcuseGenerated(true);
    } catch(error) {
      console.log(error);
      setExcuse('Excuse Generator is sick of your lies right now, try again shortly...')
    }
  }

  const shareExcuse = async () => {
    try {
      await Share.share({
        message: excuse
      })
    } catch(error) {
      console.log(error);
    }
  }

  const handleTextInputChange = (typeInput) => {
    setTypeInput(typeInput);
  }

  const toggleSwitch = () => {
    if (switchState === false) {
      setSwitchState(true);
    } else {
      setSwitchState(false);
    }
  };

  return (
    <NativeBaseProvider >
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.backgroundImage}
      >
        <StatusBar backgroundColor='black' barStyle="light-content"/>
        <ScrollView>
          <KeyboardAvoidingView style={styles.container} behavior="position">
            <View style={styles.excuseView}>
              <Text style={styles.excuseText}>{excuse}</Text>
            </View>
            {excuseGenerated && (
              <View style={styles.container}>
                <Button onPress={shareExcuse}>
                  Share
                </Button>
              </View>
            )}
            <Box style={styles.inputBox}>
              <Text color='white'>Have a specific event you need to get out of? Describe it below!</Text>
              <Input
                color='white'
                placeholder="Type here..."
                accessibilityLabel="Excuse type input field"
                onChangeText={handleTextInputChange}
                defaultValue={typeInput}
              />
              <Button onPress={generateExcuse}>Generate Excuse</Button>
                <Switch testID={'switch'}
                  onValueChange={toggleSwitch}
                  value={switchState}
                  disabled={false}
                  activeText={'On'}
                  inActiveText={'Off'}
                  circleSize={30}
                  barHeight={1}
                  circleBorderWidth={3}
                  backgroundActive={'green'}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#30a566'}
                  circleInActiveColor={'#000000'}
                />
               
            </Box>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: "black"
  },

  excuseView: {
    marginTop: '50%',
    marginLeft: '20%',
    marginRight: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputBox: {
    marginTop: '50%',
    marginLeft: '20%',
    marginRight: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  excuseText: {
    color: 'white',
  },
});
