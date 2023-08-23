import React, { useState } from "react";
import { View, Text, Button } from "react-native"; 
import { Input, NativeBaseProvider } from "native-base";
import axios from "axios";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

	const handleSignUp = async () => {
		try {
			const response = await axios.post("https://excuse-s1se.onrender.com/users",
			{
			email,
			password,
			username,
			})
		} catch(e) {
			console.log(e);
		} finally {
			navigation.navigate("Excuse")
		}
	}
 return(
  <NativeBaseProvider>
    <View>
     <Text>Sign Up Here</Text>
      <Input 
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <Input 
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <Input 
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      />
    </View>
		<Button 
		title="Sign Up"
		onPress={handleSignUp}
		>Sign Up</Button>
  </NativeBaseProvider>
 );
}

export default SignUp;