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
  Switch,
} from "native-base";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

function Home() {
  const [excuse, setExcuse] = useState("");

  const generateExcuse = async () => {
    try {
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
    } catch (error) {
      console.log(error);
      setExcuse(
        "Excuse Generator is sick of your lies right now, try again shortly..."
      );
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
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
        <Switch
          testID={"switch"}
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
    </View>
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
