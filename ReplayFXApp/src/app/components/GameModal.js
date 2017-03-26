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
          <View style= {styles.gameModalContainer}>
            <Text style={styles.modaltitle}>{props.gameModalTitle}</Text>
             <Text style ={styles.gameModalItem}>Location: {props.gameModalLocation}</Text>
            <Text style={styles.gameModalItem}>Release Date: {props.gameModalReleaseDate}</Text>
            <Text style ={styles.gameModalItem}>Developer: {props.gameModalDeveloper}</Text>
            <Text style ={styles.gameModalItem}>Genre: {props.gameModalGenre}</Text>
            <Text style ={styles.gameModalItem}>Number of Players: {props.gameModalPlayers}</Text>
            <ScrollView>
            <Text style = {styles.modaldescription}>{props.gameModalOverview}</Text>
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