import React, { useState } from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native"; 
import { Input, NativeBaseProvider, VStack } from "native-base";
import axios from "axios";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);

	const handleSignUp = async () => {
		try {
      setIsLoading(true);
			const response = await axios.post("https://excuse-s1se.onrender.com/users",
			{
			email,
			password,
			username,
			})
		} catch(e) {
			console.log(e);
		} finally {
      setIsLoading(false);
			navigation.navigate("Excuse")
		}
	}
 return(
  <NativeBaseProvider>
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.inputBox}>
        <VStack space={4} alignItems ={"center"}>
       <Text style={styles.signUpText}>Sign Up Here</Text>
        <Input 
          style={ {color: "white"}}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <Input 
          style={ {color: "white"}}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input 
          style={ {color: "white"}}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
        />
        </VStack>
      </View>
      <View style={styles.buttonContainer}>
		    <Button
        isLoading={isLoading}
        isLoadingText="Submitting"
		    title="Sign Up"
		    onPress={handleSignUp}
		    >Sign Up</Button>
      </View>
    </ImageBackground>
  </NativeBaseProvider>
 );
}

export default SignUp;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "black",
  },

  inputBox: {
    marginTop: "30%",
    marginLeft: "20%",
    marginRight: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    marginTop: "30%",
    marginLeft: "30%",
    marginRight: "30%",
    alignItems: "center",
    justifyContent: "center",
  },

  signUpText: {
    marginBottom: 20,
    color: "white",
    // marginTop: "60%",
    // marginLeft: "20%",
    // marginRight: "20%",
    // alignItems: "center",
    // justifyContent: "center"
  }
})