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
        <Text animation='flipInY' delay={400} style={styles.title}>{props.item.title}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}> {props.timeConverter(props.item.startTime)} - {props.timeConverter(props.item.endTime)}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}>{props.item.location}</Text>
        <Text animation='flipInY' delay={400} style={styles.description}>{props.item.description}</Text>
      <View style={styles.iconrowstyle}>
      <MoreInfoButton
        extendedDescription={props.item.extendedDescription}
        image={props.item.imageUrl}
        onSetModalVisible={() => props.onSetModalVisible(props)}/>
      <AddFavoriteButton
        item={props.item}
        onFavoriteButtonPress={props.onFavoriteButtonPress}
        />
      </View>
      </View>
    );
  }
  
  export default ScheduleItem;

