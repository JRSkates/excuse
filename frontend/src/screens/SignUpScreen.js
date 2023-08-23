import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native"; 

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


return(
  <View>
   <Text>Sign Up</Text>
    <TextInput 
      placeholder="username"
      value={username}
      onChangeText={setUsername}
    />
  </View>
 )
}

export default SignUp;