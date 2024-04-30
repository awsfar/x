import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FlatList, Text, View, Image, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import axios from 'axios';
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';


const App = ({ navigateToScreen, keyProp, IZ, IN}) => {
  const key = keyProp
  const [show,Setshow]=useState(true)
  const [progressValue, setProgressValue] = useState(53);
  const [running, setRunning] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [Po, setPo] = useState(true);
  const [QN, setQN] = useState(IN.value);
  const [QSound, setQSound] = useState(true);
  const [SoundP, setSoundP] = useState();
  const [Value, setValue] = useState(0);
  const [Co, setCo] = useState([]);
  const [CCo, setCCo] = useState(["green", "green", "green", "green"]);
  const X_list = quezs[key]
  const stylr_zome_IN={name:"zoom-out",image_style:{borderRadius:10,height: 345, width: 545, transform: [{ rotate: '90deg' }] ,zIndex:20},View_style:{marginTop: 100,alignItems:"center",height: 800 ,width: 385,}}
  const stylr_zome_OUT={name:"zoom-in",image_style:{borderRadius:10,height: 244, width: 385, transform: [{ rotate: '0deg' }] ,zIndex:20},View_style:{marginTop: 10,alignItems:"center",height: 244 ,width: 385,}}
  const [IS, SetIS] = useState(stylr_zome_OUT);
  const Q = X_list[QN];
  const q = Q?.quez;
  const rll = Q?.resp_list;
  const ctext = Q?.quez_h;
  
  const q_image = Q?.quez_imag;
  const editDataInAsyncStorage = async (key, newData) => {
    try {
      // Store the updated data back into AsyncStorage
      //console.log(newData)
      await AsyncStorage.setItem(key, JSON.stringify(newData));
      const valuex = await AsyncStorage.getItem(key);
      //console.log("valeu_x",valuex)
      setValue(valuex.true_response)
      //console.log('Data updated successfully!');
    } catch (error) {
      //console.log('Error editing data:', error);
    }
  };


  useEffect(() => {
    const backAction = () => {
      //console.log('hello_bay')
      navigateToScreen('Home')
      IN.value=0
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    if (running) {
      const id = setInterval(() => {
        setProgressValue(prevValue => (prevValue > 0 ? prevValue - 1 : 0));
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [running]);

  useEffect(() => {
    if (progressValue === 0) {
      clearInterval(intervalId);
      handleRespons(4);
    }
  }, [progressValue]);

  const handleStart = () => {
    setProgressValue(53);
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const stopSound = async () => {
    try {
      if (SoundP) {
        await SoundP.stopAsync();
        setQSound(true);
      }
    } catch (error) {
      console.error('Failed to stop sound', error);
    }
  };

  const handleSound = () => {
    if (QSound) {
      playSound(Q?.quez_sound);
      setQSound(false);
    }
  };


  const handleRespons = async (index) => {
    let updatedValue = Value; // Initialize with the current value

    if (QN === 0) {
      await editDataInAsyncStorage(key, { "true_response": 0 });
      updatedValue = 0; // Update the value immediately
    }

    if (index === Q.index_true) {
      //console.log("valeu_old", updatedValue); // Use updatedValue instead of Value
      updatedValue += 1; // Update the value immediately
      //console.log("valeu_nex", updatedValue);
      await editDataInAsyncStorage(key, { "true_response": updatedValue }); // Await for AsyncStorage update
    }

    setValue(updatedValue); // Update the state afterwards

    stopSound();
    handlePause();

    setCo(Q?.true_resp);
    setPo(false);
  };


  const Next = () => {
    setQN(prevQN => (prevQN + 1 < X_list.length ? prevQN + 1 : navigateToScreen('Home')));
    setPo(true);
    setCo(Q?.org);
    stopSound();
    handleStart();
    setCCo(["green", "green", "green", "green"]);
  };

  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => handleRespons(index)}>
      <View style={[styles.cr, { borderColor: Co[index] }]}>
        <TextTimer text={item} pf={30} sf={20} color={Co[index]} />
      </View>
    </Pressable>
  );

  const TextTimer = ({ text, pf, sf, color }) => {
    const fontSize = useMemo(() => {
      const scaleFactor = Math.min(1, sf / pf);
      return pf + (sf - pf) * (text.length / 27) * scaleFactor;
    }, [text, pf, sf]);

    return (
      <Text style={{ fontSize, color, margin: 3, fontFamily: 'Cairo_Regular' }}>
        {text}
      </Text>
    );
  };

  const playSound = async (audioFile) => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(audioFile);
      setSoundP(soundObject);
      await soundObject.playAsync();
    } catch (error) {
      console.error('Failed to load sound', error);
    }
  };

  const sendMessageToDiscord = async () => {
    try {
      const webhookUrl = 'https://discord.com/api/webhooks/1165290854416646225/NFI2Puw2SYeWNetzEm9sr_KtCSjEA-6CS54hTQZDCy7LD-EYLuv0rM2oioO7ObazFZvU';
      const payload = {
        content: JSON.stringify(Q, null, 2),
      };

      await axios.post(webhookUrl, payload);
      //console.log('Message sent to Discord successfully!');
    } catch (error) {
      console.error('Error sending message to Discord:', error);
    }
  };
  const ZoomInButton = ({ onPress }) => {
    const handleZoomInPress = () => {
      // Your logic for handling zoom in press
      // For example, you can update the state to change the image size
      //styles.img=
      if (show){
      SetIS(stylr_zome_IN)
      Setshow(false)}
      else{
        SetIS(stylr_zome_OUT)
        Setshow(true)
      }

    };
    return (
      <Pressable onPress={handleZoomInPress} style={{ position: "absolute", bottom: 10, right: 10, zIndex: 1 }}>
        <Feather name={IS.name} size={24} color="white" />
      </Pressable>
    );
  };

  return (
    <View style={styles.premier_screen}>
      <View style={styles.top_bar}>
        <CircularProgress
          value={progressValue}
          maxValue={53}
          activeStrokeWidth={11}
          radius={30}
          progressValueStyle={{ fontSize: 20, color: 'white', fontFamily: 'Cairo_Regular' }}
          progressValueColor={'#ecf0f1'}
          strokeColorConfig={[
            { color: 'yellowgreen', value: 53 }, // Start color should be 'yellowgreen' (53 seconds)
            { color: 'skyblue', value: 27 }, // Change color to 'skyblue' at 33 seconds remaining
            { color: 'red', value: 0 }, // Change color to 'red' at 0 seconds remaining
          ]}
        />
        <Pressable onPress={handleSound}>
          <AntDesign style={styles.icon_sound} name="sound" size={50} color="black" />
        </Pressable>
        <Text style={[styles.text_p, styles.text_qn, { fontFamily: 'Cairo_Regular', }]}>{QN + 1 + "/" + X_list.length}</Text>
      </View>
      <View style={[IS.View_style]}>
        <ImageBackground source={q_image} style={[IS.image_style]}>
          <ZoomInButton />
        </ImageBackground>
      </View>
      <View style={styles.question_text}>
        <Text style={[styles.q, { fontFamily: 'Cairo_Regular', }]}>
          <TextTimer text={q} pf={25} sf={20} />
        </Text>
      </View>
      <View style={styles.question_respons}>
        <FlatList
          data={rll}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.add_option}>
        {Po ? (
          <Pressable onPress={() => console.log("hello")}>
            <AntDesign name="pluscircleo" size={80} color="black" />
          </Pressable>
        ) : (
          <View style={styles.plus}>
            <View style={styles.iconWrapper} >
              <Pressable onPress={() => {alert(ctext) }}>
                <AntDesign name="exclamation" size={60} color="black" />
              </Pressable>
            </View>
            <View style={styles.iconWrapper}>
              <Pressable onPress={Next}>
                <MaterialIcons name="navigate-next" size={60} color="black" />
              </Pressable>
            </View>
            <View style={styles.iconWrapper}>
              <Pressable onPress={sendMessageToDiscord}>
                <Ionicons name="bookmarks-outline" size={50} color="black" />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    backgroundColor: 'transparent',
    backgroundImage: `linear-gradient(to bottom right, #EBF1FF, #FEFEFE)`,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    direction: "column",
  },
  top_bar: {
    marginTop: 25,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  timer: {
    borderWidth: 8,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  text_qn: {

    color: "red",
    fontSize: 30,
  },
  text_timer: {

    color: "red",
    fontSize: 20,
  },
  icon_sound: {},
  
  image_q: {
    height: 181,
    width: 385,
    borderRadius: 17,
  },
  question_text: {
    marginTop: 3,
    height: 100,
    width: 385,
    justifyContent: 'center',
    alignItems: 'center',
  },
  q: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,

  },
  question_respons: {
    marginTop: 5,
    height: 230,
    width: 385,
    borderColor: "red",
  },
  cr: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 17,
    marginTop: 10,
    width: "100%",
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  r: {
    fontSize: 25,
    textAlign: "center",
    textAlignVertical: "center",
  },
  cr1: {
    borderRadius: 17,
  },
  cr2: {},
  cr3: {},
  add_option: {
    marginTop: 30,
    height: 90,
    width: 385,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "white"
  },
  plus: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

export default App;
