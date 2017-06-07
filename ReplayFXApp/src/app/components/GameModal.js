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
             <ScrollView>
              <View style ={{alignItems: 'center'}}>
              {props.modalImage ? <Image source={{uri: props.modalImage}} style={styles.modalimage}/> : null}
           </View>
            <Text style={styles.modaltitle}>{props.gameModalTitle}</Text>
             <Text style ={styles.gameModalItem}>Location: {props.gameModalLocation}</Text>
            <Text style={styles.gameModalItem}>Release Date: {props.gameModalReleaseDate}</Text>
            <Text style ={styles.gameModalItem}>Developer: {props.gameModalDeveloper}</Text>
            <Text style ={styles.gameModalItem}>Genre: {props.gameModalGenre}</Text>
            <Text style ={styles.gameModalItem}>Number of Players: {props.gameModalPlayers}</Text>
            <Text style = {styles.modaldescription}>{props.gameModalOverview}</Text>
            <View style ={styles.center}>
            <TouchableHighlight underlayColor="#ffffff" onPress={() => {
              props.setModalVisible(props);
            }}>
              <View><CloseIcon/></View>
            </TouchableHighlight>
          </View>
          </ScrollView>
          </View>
        </Modal>

    )}

    export default GameModal;
