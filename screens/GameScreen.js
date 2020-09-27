import React, { useState, useRef, useEffect } from 'react';
//useRef allows you to create object which you can bind to your input element to get access to your code and also
//a hook that allows you to define a value which survives component rerender
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Number from '../components/number.js';
import Card from '../components/card.js';
import DefaultStyles from '../constants/default-styles.js';
import TitleText from '../components/titleText.js';
import GameOverScreen from './GameOverScreen.js';
import StartingScreen from './StartingScreen.js';
import GameFailed from './gameFailed.js';



// this is a function that generate a random number so if you need to access this function the following need to be provided (min, max, exclude)
// like we did it in the hook inside gamescreen componnent
const generateRandomBetween = ( min, max, exclude ) =>{
   min = Math.ceil(min);
   max = Math.floor(max);
   const rndNum = Math.floor(Math.random() * (max - min)) + min;
   return rndNum;

}

const GameScreen = props => {
  //the hook state bellow currentGuess is initially set by the value of our function that generate random number the exclude was replaced
  //by a prop called userchoice so everytime this state will be accessed this prop need to be provided and the value of that prop will not be
  //rendered in as a guessed number
 const [ currentGuess, setCurrentGuess ] = useState(generateRandomBetween(1, 100, props.userChoice));
 // console.log(props.userChoice);
 const [ rounds, setRounds ] = useState(0);
 const currentLow = useRef(1);
 const currentHigh = useRef(100);
 const { userChoice, onGameOver } = props;
 const [ wrongGuess, setWrongGuess ] = useState(0);
 const [ userSelection, setUserSelection ] = useState(props.userChoice);


 //first argument is the function it should execute after  rerendering the componentand the second will render an array of dependencies of the function
 useEffect(() =>{
   if (currentGuess == userChoice ){
     //content = <GameOverScreen roundsNumber={rounds} userNumber={userChoice} wrongGuess={wrongGuess} newGame={newGameHandler}/>
     //props.onGameOver(rounds);
   }
   //this effect will only re run if one of the dependencie inside the array is changed
 }, [currentGuess, userChoice, onGameOver]);
//this is the function that will be run everytime the user click on either LOWER or GREATER button on the screen

 const nextGuessHandler = direction =>{

   if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
        //if the condition above is true we will render this alert('message1', message2 {button: 'Name', BTNpurpose: 'cancel'})
          Alert.alert('Dont lie','You Know that is wrong',[
            {text: 'Sorry', style:'cancel'}
          ]);
          //wrong+=1;
          setWrongGuess(wrongGuess+1);
          // props.handleWrongGuess('');
          setRounds(rounds+1);
          return;
   }


   if(direction === 'lower'){
     //current is a property of useRef that refere to the current value of the state and capture value without rerendering the screen
     currentHigh.current = currentGuess;
   }else {
     currentLow.current = currentGuess;
   }
   //this function generate a random number between the (min , max, exclude ) provided in it
   const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess );

   setCurrentGuess(nextNumber);
   setRounds(curRounds => curRounds + 1);


 };

let content = () =>{
  return(
    <View style={styles.screen}>
      <TitleText style={{...DefaultStyles.title, ...styles.text}}>opponent's Guess</TitleText>
     <Number>{currentGuess}</Number>
      <Card style={styles.btnContainer}>
          <Button title="LOWER"  onPress={nextGuessHandler.bind(this, 'lower')}/>
          <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}/>
      </Card>
      <Text>number of Guesses {rounds}</Text>
    </View>
  )
}

if(currentGuess==userChoice){
   content = () => {
     return  <GameOverScreen roundsNumber={rounds} userNumber={userChoice} wrongGuess={wrongGuess} newGame={props.newGameHandler}/>
   }
}else if(rounds==10){
  content = ()=>{
    return <GameFailed reset={props.newGameHandler}/>

  }
}


 const newGameHandler = (content)=>{
   setRounds(0);
   setCurrentGuess(0);

   // console.log('here');

 }

 return (
      content()
)

}

const styles = StyleSheet.create({
      screen:{
          flex: 1,
          padding: 10,
          alignItems: 'center'
      },
      btnContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
      },
      text:{
        margin: 5,
        fontSize: 20
      }
});

export default GameScreen;
