import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../constants/color.js'

const numberSelected = (props) => {
  return(
    <View style={styles.block}>
        <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    justifyContent: 'center',
    borderWidth: 2,
    alignItems: 'center',
    width: 35,
    height: 35,
    borderColor: Color.primary,
    borderRadius: 7

  },
  text:{
    justifyContent: 'center',
    fontSize: 20



  }
})

export default numberSelected;
