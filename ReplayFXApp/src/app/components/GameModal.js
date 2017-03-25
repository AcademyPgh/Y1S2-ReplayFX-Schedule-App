import React, {Component} from 'react';
import {
    Modal,
    ScrollView,
    View,
    TouchableHighlight,
    Text
} from 'react-native';
import styles, {stylechoice} from '../styles/StyleSheet';
import CloseIcon from '../utils/closeIcon';

const GameModal=(props)=> {
    return (<Modal
          animationType={'slide'}
          transparent={false}
          visible={props.gameModalVisible}
          onRequestClose ={() => props.setModalVisible(props)}>
          <View style= {styles.innerContainer}>
            <Text style={styles.modaltitle}>Title: {props.gameModalTitle}</Text>
            <Text style={styles.modaldatetime}>Release Date: {props.gameModalReleaseDate}</Text>
            <Text style ={styles.modaldatetime}>Location: {props.gameModalLocation}</Text>
            <Text style ={styles.modaldatetime}>Developer: {props.gameModalDeveloper}</Text>
            <Text style ={styles.modaldatetime}>Genre: {props.gameModalGenre}</Text>
            <Text style ={styles.modaldatetime}>Number of Players: {props.gameModalPlayers}</Text>
            <ScrollView>
            <Text style = {styles.gamemodaldescription}>Additional Information: {props.gameModalOverview}</Text>
          </ScrollView>
            <View style ={styles.center}>
            <TouchableHighlight onPress={() => {
              props.setModalVisible(props);
            }}>
              <View><CloseIcon/></View>
            </TouchableHighlight>
          </View>
          </View>
        </Modal>

    )}

    export default GameModal;