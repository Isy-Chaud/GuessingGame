import React from 'react';
import { Text, StyleSheet, View } from 'react-native';


const TitleText = props =>
    <Text style={{...styles.title, ...props.style }}>{props.children}</Text>;


const styles= StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 17,
  }
});
export default TitleText;
