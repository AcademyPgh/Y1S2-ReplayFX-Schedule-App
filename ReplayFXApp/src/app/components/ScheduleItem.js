import styles, {stylechoice} from '../styles/StyleSheet';
import React, {Component} from 'react';
import {
  Alert,
  TouchableHighlight,
} from 'react-native';
import {createAnimatableComponent, View, Text} from 'react-native-animatable';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import MoreInfoButton from './MoreInfoButton';
import AddFavoriteButton from './AddFavoriteButton';

const ScheduleItem = (props) => {
  return (
      <View style = {styles.info}>
        <Text animation='flipInY' delay={400} style={styles.title}>{props.item}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}> {props.item} - {props.item}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}>{props.item}</Text>
        <Text animation='flipInY' delay={400} style={styles.description}>{props.item}</Text>
      <View style={styles.iconrowstyle}>
      <MoreInfoButton
        extendedDescription={props.item}
        image={props.item}
        onSetModalVisible={(props) => props.onSetModalVisible(props)}/>
      <AddFavoriteButton 
        id={props}
        isFavorite={props}
        onFavoriteButtonPress={() => props.onFavoriteButtonPress()}
        animateFavorite={() => props.onAnimateFavorite()}
        favoriteColor={props.favoriteColor}
        />
      </View>
      </View>
    );
  }

  export default ScheduleItem;

  // <Text animation='flipInY' delay={400} style={styles.title}>{props.title}</Text>
  //       <Text animation='flipInY' delay={400} style={styles.datetime}> {props.startTime} - {props.endTime}</Text>
  //       <Text animation='flipInY' delay={400} style={styles.datetime}>{props.location}</Text>
  //       <Text animation='flipInY' delay={400} style={styles.description}>{props.description}</Text>