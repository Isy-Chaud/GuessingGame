import React, { useState } from 'react';
import { View, Text, StyleSheet,TextInput, Button, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
//Alert is not a component but an object where we can call a native api and here it's gonna help us display alerts if something goes wrong
//the Keyboard imported above is not a component but an api that allows us to interavt with the Keyboard
import Card from '../components/card.js';
import Color from '../constants/color.js';
import Input from '../components/input.js';
import Number from '../components/number.js';
import BodyText from '../components/bodyText.js';
import TitleText from '../components/titleText.js';
import DefaultStyles from '../constants/default-styles.js';

const startingScreen = props => {
  const [ enteredValue, setEnteredValue] = useState('');
  const [ confirmed, setConfirmed ] = useState(false);
  const [ selectedNumber, sestSelectedNumber ] = useState();


  //this function capture the user input  verifie if everything entered is a number
  // and if not he will replace the updated value to an empty string
  const numbeInputHandler = inputText =>{
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };
  //this function empty the input field everytime the user click reset because the input field value="enteredValue"
  //and here their calling setEnteredValue and assigning it to an empty string... the setConfirmed is the updating function of the hook called
  //confirmed and in here is value(state) is false
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };
  //i need a function that will collect the value of the state and pass it as a prop to the gameOverscreen

  const confirmInputHandler = () =>{
    const chosenNumber = parseInt(enteredValue);
    //isNan() cheks if the value is not a number it;s a javascript function

    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99 ){
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',

        [{text: 'okay', style: 'destructive', onPress: resetInputHandler }]
      );

      return;
    }
    setConfirmed(true);
    sestSelectedNumber(enteredValue);
  }
  let OutputText;
  //the if statement bellow checks if confirmed state is true then return a Text tag and assigning that value to OutputText and
  //OutputTextwill be called in the parrent View and the only one time this condition is verified it's inside confirmInputHandler()
  if(confirmed){

    OutputText = <Card style={styles.container}>
                    <Text style={styles.selection}>You selected</Text>

                    <Number children={selectedNumber}/>

                    <Button  title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>

                </Card>;

  }

  return (
    // so we wrap all our page withh TouchableWithoutFeedback and we passed it a
    //props that will dismiss the keyboard if the user click in any empty space in the app
    <TouchableWithoutFeedback
    onPress={() =>{
      Keyboard.dismiss();
    }}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New game</TitleText>
        <Card style={styles.inputView}>
            <BodyText style={DefaultStyles.bodyText}>Type Your Number</BodyText>
            <Input
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                style={styles.Input}
                onChangeText={numbeInputHandler}
                value={enteredValue}
                />
            <View style={styles.buttonView}>

              <View style={styles.Button} >
                  <Button color={Color.accent} title="Reset" onPress= {resetInputHandler} />
              </View>
              <View style={styles.Button}>
                  <Button color={Color.primary} title="Confirm" onPress= {confirmInputHandler} />
              </View>
            </View>
        </Card>
        {OutputText}

      </View>
      </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonView:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',


  },
  inputView:{
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    margin: 10
  },
  title:{
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
    margin: 20
  },
  Button: {
    width: 100,
    borderRadius: 10
  },
  Input: {
    width:'60%',
    textAlign: 'center'
  },
  selection: {
    margin: 10,
    fontSize: 20
  },
  container: {
    alignItems: 'center'
  },
  Text:{
    fontFamily: 'open-sans'
  }
});

export default startingScreen;
