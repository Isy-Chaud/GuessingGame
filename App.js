import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet,View } from 'react-native';
import Header from './components/Header.js';
import StartingScreen from './screens/StartingScreen.js';
import GameScreen from './screens/GameScreen.js';
import GameOverScreen from './screens/GameOverScreen.js';
import GameFailedScreen from './screens/gameFailed.js';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () =>{
     return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
const [ userNumber, setUserNumber ] = useState();
//this bellow state is for the number of the guesses the user will do before giving the right answer
const [ guessRounds, setGuessRounds ] = useState(0);
// console.log(guessRounds, 'isy8');
const [ dataLoaded, setDataLoaded ] = useState(false);
const [ wrongGuess, setWrongGuess ] = useState(0);



if(!dataLoaded){
  return (<AppLoading
              startAsync={fetchFonts}
              onFinish={() => setDataLoaded(true)}
              onError={(err) => console.log(err)}
              />);
}

const gameOverHandler = numOfRounds =>{
  setGuessRounds(numOfRounds);
}


const startGameHandler = (selectedNumber) => {
  //console.log(selectedNumber);
  setUserNumber(selectedNumber);
}

const resetUserNumber = () =>{
  // console.log('here');
  setUserNumber(0);
}



let content = <StartingScreen onStartGame={startGameHandler}  />;


if(userNumber){

  content = <GameScreen  onGameOver={gameOverHandler} userChoice={userNumber} onStartGame={startGameHandler} newGameHandler={resetUserNumber}/>;
}else{
  content = <StartingScreen onStartGame={startGameHandler}  />
}



  return (
    <View style={styles.screen}>
      <Header title="Guessing Game"/>
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1
    }
});
