import React, {Component} from 'react';
import {
    Modal,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
    Text
} from 'react-native';
import styles, {stylechoice} from '../styles/StyleSheet';
import CloseIcon from '../utils/closeIcon';

const ScheduleModal=(props)=> {
    return (<Modal
          animationType={'slide'}
          transparent={false}
          visible={props.modalVisible}
          onRequestClose ={() => props.onSetModalVisible(props)}>
          <View style= {styles.innerContainer}>
            <Text style={styles.modaltitle}>{props.modalTitle}</Text>
            <Text style={styles.modaldatetime}>{props.modalStartTime} - {props.modalEndTime}</Text>
            <Text style ={styles.modaldatetime}>{props.modalLocation}</Text>
            <ScrollView>
            <View style ={{alignItems: 'center'}}>
              {props.modalImage ? <Image source={{uri: props.modalImage}} style={styles.modalimage}/> : null}
           </View>
            <Text style = {styles.modaldescription}>{props.modalDescription}</Text>
          </ScrollView>
            <View style ={styles.center}>
            <TouchableHighlight onPress={() => {
              props.onSetModalVisible(props);
            }}>
              <View><CloseIcon/></View>
            </TouchableHighlight>
          </View>
          </View>
        </Modal>

    )}

    export default ScheduleModal;
