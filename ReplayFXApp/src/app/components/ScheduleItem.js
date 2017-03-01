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

function ScheduleItem(props) {
  return (
      <View style = {styles.info}>
        <Text animation='flipInY' delay={400} style={styles.title}>{props.title}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}> {props.startTime} - {props.endTime}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}>{props.location}</Text>
        <Text animation='flipInY' delay={400} style={styles.description}>{props.description}</Text>
      <View style={styles.iconrowstyle}>
      <MoreInfoButton
        extendedDescription={props.extendedDescription}
        image={props.image}
        onSetModalVisible={() => props.onSetModalVisible(props)}/>
      <AddFavoriteButton 
        id={props.id}
        isFavorite={props.isFavorite}
        onFavoriteButtonPress={() => props.onFavoriteButtonPress(props)}
        //favoriteColor={props.favoriteColor}
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