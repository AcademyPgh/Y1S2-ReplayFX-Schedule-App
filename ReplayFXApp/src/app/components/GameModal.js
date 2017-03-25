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
          onRequestClose ={() => props.onSetGameModalVisible(props)}>
          <View style= {styles.innerContainer}>
            <Text style={styles.modaltitle}>{props.gameModalTitle}</Text>
            <Text style={styles.modaldatetime}>{props.gameModalReleaseDate}</Text>
            <Text style ={styles.modaldatetime}>{props.gameModalLocation}</Text>
            <Text style ={styles.modaldatetime}>{props.gameModalDeveloper}</Text>
            <Text style ={styles.modaldatetime}>{props.gameModalGenre}</Text>
            <Text style ={styles.modaldatetime}>Number of Players: {players}</Text>
            <ScrollView>
            <View style ={{alignItems: 'center'}}>
                <Image source={{uri: props.gameModalImage !== null ? props.gameModalImage : ''}} style={styles.modalimage}/>
           </View>
            <Text style = {styles.gamemodaldescription}>{props.gameModalOverview}</Text>
          </ScrollView>
            <View style ={styles.center}>
            <TouchableHighlight onPress={() => {
              props.onSetGameModalVisible(props);
            }}>
              <View><CloseIcon/></View>
            </TouchableHighlight>
          </View>
          </View>
        </Modal>

    )}

    export default GameModal;