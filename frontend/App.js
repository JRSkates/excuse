import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
  Share,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  NativeBaseProvider,
  Text,
  Button,
  Input,
  Box,
  useClipboard,
  HStack,
  Switch
} from "native-base";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const [excuse, setExcuse] = useState("");
  const [excuseGenerated, setExcuseGenerated] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [typeInput, setTypeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const { onCopy } = useClipboard();

  const generateExcuse = async () => {
    try {
      setIsLoading(true);

      console.log("click");
      const response = await axios.get(
        `https://excuse-s1se.onrender.com/excuse`,
        {
          params: {
            eventType: typeInput,
            toggle: switchState
          },
        }
      );
      setTypeInput("");
      const data = response.data;
      setExcuse(data.excuse);
      setExcuseGenerated(true);
      const key = `excuse_${Date.now()}`;
      save(key, excuse);
    } catch (error) {
      console.log(error);
      setExcuse(
        "Excuse Generator is sick of your lies right now, try again shortly..."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const shareExcuse = async () => {
    try {
      await Share.share({
        message: excuse,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextInputChange = (typeInput) => {
    setTypeInput(typeInput);
  };

  const handleCopyButtonPress = () => {
    onCopy(excuse);
    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };

  const toggleSwitch = () => {
    if (switchState === false) {
      setSwitchState(true);
    } else {
      setSwitchState(false);
    }
  };

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log("Saved successfully")
  }

  async function getValueFor(key) {
    const res = await SecureStore.getItemAsync(key);
    console.log(res)
  }
  

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require("./assets/background.png")}
        style={styles.backgroundImage}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <ScrollView>
          <KeyboardAvoidingView style={styles.container} behavior="position">
            <View style={styles.excuseView}>
              <Text style={styles.excuseText}>{excuse}</Text>
            </View>
            {excuseGenerated && (
              <View style={styles.container}>
                <HStack space={3}>
                  <Button onPress={shareExcuse}>
                    Share
                  </Button>
                  <Button onPress={handleCopyButtonPress}>
                    {copyButtonText}
                  </Button>
                </HStack>
              </View>
            )}
            <Box style={styles.inputBox}>
              <Text color="white">
                Have a specific event you need to get out of? Describe it below!
              </Text>
              <Input
                color="white"
                placeholder="Type here..."
                accessibilityLabel="Excuse type input field"
                onChangeText={handleTextInputChange}
                defaultValue={typeInput}
              />
              <Switch testID={'switch'}
                  onValueChange={toggleSwitch}
                  value={switchState}
                />
              <Button
                onPress={generateExcuse}
                isLoading={isLoading}
                isLoadingText="Submitting"
              >
                Generate Excuse
              </Button>
            </Box>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "black",
  },

  excuseView: {
    marginTop: "50%",
    marginLeft: "20%",
    marginRight: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  inputBox: {
    marginTop: "50%",
    marginLeft: "20%",
    marginRight: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  excuseText: {
    color: "white",
  },
});

