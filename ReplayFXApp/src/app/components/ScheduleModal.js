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
            <ScrollView>
            <Text style={styles.modaltitle}>{props.modalTitle}</Text>
            <Text style={styles.modaldatetime}>{props.modalStartTime} - {props.modalEndTime}</Text>
            <Text style ={styles.modaldatetime}>{props.modalLocation}</Text>
            <View style ={{alignItems: 'center'}}>
              {props.modalImage ? <Image source={{uri: props.modalImage}} style={styles.modalimage}/> : null}
           </View>
            <Text style = {styles.modaldescription}>{props.modalDescription}</Text>

            <View style ={styles.center}>
            <TouchableHighlight underlayColor="#ffffff" onPress={() => {
              props.onSetModalVisible(props);
            }}>
              <View><CloseIcon/></View>
            </TouchableHighlight>
          </View>
          </ScrollView>
          </View>
        </Modal>

    )}

    export default ScheduleModal;
