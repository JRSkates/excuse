import React, { useState } from "react";
import { View, Text, Button } from "react-native"; 
import { Input, NativeBaseProvider } from "native-base";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
		<Button>Sign Up</Button>
  </NativeBaseProvider>
 );
}

export default SignUp;