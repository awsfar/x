import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ setQuez_list, navigateToScreen }) => {
  const [percentage, setPercentage] = useState(0);
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

  useEffect(() => {
    const loadPercentage = async () => {
      try {
        // Load data from AsyncStorage for each item in the alphabet array
        for (const letter of alphabet) {
          const key = `Q_${letter}`;
          const value = await AsyncStorage.getItem(key);
          if (value) {
            const parsedValue = JSON.parse(value);
            const trueResponse = parsedValue.true_response || 0; // Default to 0 if true_response is not available
            const calculatedPercentage = (trueResponse / 30) * 100;
            setPercentage(prevPercentage => ({
              ...prevPercentage,
              [letter]: calculatedPercentage
            }));
          }
        }
      } catch (error) {
        //console.log('Error loading data:', error);
      }
    };

    loadPercentage();
  }, []);

  const handleButtonPress = (letter) => {
    const key = `Q_${letter}`;
    setQuez_list(key);
    navigateToScreen("Quiz");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.tou}
      onPress={() => handleButtonPress(item)}
    >
      <CircularProgress
        value={percentage[item] || 0}
        maxValue={100}
        activeStrokeWidth={11}
        radius={40}
        progressValueStyle={{ fontSize: 20, color: 'white', fontFamily: 'Cairo_Regular' }}
        progressValueColor={'#ecf0f1'}
        valueSuffix={'%'}
        strokeColorConfig={[
          { color: 'yellowgreen', value: 50 },
          { color: 'red', value: 0 },
        ]}
      />
      <Text style={styles.buttonText}>Question list {item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.fl}
        data={alphabet}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tou: {
    margin: 20,
    alignItems: "center",
    width: (width - 60) / 2, // Adjusted width for each item
  },
  container: {
    margin:50,
    alignItems: "center",
    direction: "column",
    flex: 1, // Fill available space
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15, // Adjusted paddingHorizontal
  },
  fl: {
    borderColor: "black",
    flexDirection: "column",
    width: width - 30, // Adjusted width
  },
  button: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: 200,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center"
  },
});

export default HomeScreen;
