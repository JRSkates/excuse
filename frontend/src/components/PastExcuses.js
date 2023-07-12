import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import * as SecureStore from "expo-secure-store";

function PastExcuses() {
  const [excuses, setExcuses] = useState([]);

  useEffect(() => {
    getAllKeyValuePairs();
  }, []);

  async function getAllKeyValuePairs() {
    try {
      let keys, keyValuePairs;

      if (SecureStore.getAllKeysAsync) {
        keys = await SecureStore.getAllKeysAsync();
        keyValuePairs = [];

        for (const key of keys) {
          const value = await SecureStore.getItemAsync(key);
          keyValuePairs.push({ key, value });
        }
      } else {
        // Fallback solution for web browsers or non-Expo environments
        keys = Object.keys(SecureStore);
        keyValuePairs = keys.map((key) => ({
          key,
          value: SecureStore.getItem(key),
        }));
      }

      setExcuses(keyValuePairs);
    } catch (error) {
      console.error('Error retrieving key-value pairs:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Excuses:</Text>
      {excuses.map((excuse, index) => (
        <View key={index} style={styles.excuseContainer}>
          <Text style={styles.excuseKey}>Key: {excuse.key}</Text>
          <Text style={styles.excuseValue}>Value: {excuse.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  excuseContainer: {
    marginBottom: 10,
  },
  excuseKey: {
    fontWeight: "bold",
  },
});

export default PastExcuses;
