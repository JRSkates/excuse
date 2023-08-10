import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
  Share,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  LogBox,
} from "react-native";
import {
  NativeBaseProvider,
  Text,
  Button,
  Input,
  Box,
  useClipboard,
  HStack,
  Switch,
} from "native-base";
import axios from "axios";

export default function HomeScreen() {
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
            toggle: switchState,
          },
        }
      );
      setTypeInput("");
      const data = response.data;
      setExcuse(data.excuse);
      setExcuseGenerated(true);
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

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <ScrollView>
          <KeyboardAvoidingView style={styles.container} behavior="position">
            <View style={styles.excuseView}>
              <Text style={styles.excuseText}>{excuse}</Text>
            </View>
            {excuseGenerated && (
              <View style={styles.buttonContainer}>
                <HStack space={8}>
                  <Button onPress={shareExcuse}>Share</Button>
                  <Button onPress={handleCopyButtonPress}>
                    {copyButtonText}
                  </Button>
                </HStack>
              </View>
            )}
            <Box style={styles.inputBox}>
              <Text style={{ marginBottom: 20 }} color="white">
                Have a specific event you need to get out of? Describe it below!
                (Optional)
              </Text>
              <Input
                color="white"
                placeholder="Type here..."
                accessibilityLabel="Excuse type input field"
                onChangeText={handleTextInputChange}
                defaultValue={typeInput}
              />
              <Text style={{ color: "white", marginTop: 20 }}>
                Incorporate the latest natural disaster?
              </Text>
              <View style={styles.nasa} margin={10}>
                <Image
                  source={require("../../assets/Nasa.png")}
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
                <Switch
                  style={{ marginLeft: 10 }}
                  size="md"
                  testID={"switch"}
                  onValueChange={toggleSwitch}
                  value={switchState}
                  alignItems="center"
                />
              </View>
              <Button
                style={styles.generateButton}
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
    marginTop: "30%",
    marginBottom: "20%",
    marginLeft: "20%",
    marginRight: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  inputBox: {
    marginTop: "30%",
    marginLeft: "20%",
    marginRight: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  excuseText: {
    color: "white",
  },

  nasa: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: "15%",
    marginTop: "5%",
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

LogBox.ignoreLogs([
  `Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.`,
  `Clipboard has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-clipboard/clipboard' instead of 'react-native'. See https://github.com/react-native-clipboard/clipboard`,
  `We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320`,
]);
