import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import quezs from "./cmp/xrftn.js";
import App from "./cmp/quez_ui.js";
import HomeScreen from "./cmp/Home_SC.js";
import AppX from "./cmp/test.js";
import Zome from "./cmp/imag_zome.js";
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { useSharedValue } from 'react-native-reanimated';
const ScreenManager = () => {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Cairo_Regular: require('./assets/fonts/Cairo_Regular.ttf'),
      });
    }

    loadFonts();
  }, []);


  const [currentScreen, setCurrentScreen] = useState('Home');
  const [key, setQuez_list] = useState("Q_P");
  const [Img, SetImg] = useState(require("./cmp/img/ex_questions/5_2.jpg"));
  const In = useSharedValue(0)
  //console.log("key app:",keys)
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen setQuez_list={setQuez_list} navigateToScreen={navigateToScreen} />;
      case 'Quiz':
        return <App navigateToScreen={navigateToScreen} keyProp={key} IZ={SetImg} IN={In}/>;
      case 'AppX':
        return <AppX />;
      case 'IMG':
        return <Zome navigateToScreen={navigateToScreen} keyProp={Img} />;
      default:
        return null;
    }
  };

  const navigateToScreen = (screenName) => {
    setCurrentScreen(screenName);
  };

  return (
    <LinearGradient
      colors={['#EFFFF0', '#FFFFFF']}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        {renderScreen()}
      </SafeAreaView>
    </LinearGradient>
  );
};

const AboutScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>About Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    backgroundColor: 'transparent',
    backgroundImage: `linear-gradient(to bottom right, #EBF1FF, #FEFEFE)`,
  },
  container: {
    flex: 1,
    paddingTop: 25,
    alignItems: "center",
    direction: "column",
  },
});

export default ScreenManager;
