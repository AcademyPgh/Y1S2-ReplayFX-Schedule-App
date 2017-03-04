import React, {Component} from 'react';
import {TouchableHighlight, Modal} from 'react-native';
import {View, Text} from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import styles, {stylechoice} from './StyleSheet';
import CloseIcon from '../utils/closeIcon';

export default class Games extends Component {
  constructor(props){
  super(props);
  this.state = {
    SECTIONS: [
      {
      title: 'Arcade',
      content: ['Streets of Rage', 'Arkanoid', 'Pac-Man'],
    },
    {
      title: 'Pinball',
      content: ['Walking Dead', 'Monopoly', 'A something or another'],
    },
    {
      title: 'Console',
      content: ['Sonic','Super Mario', 'Donkey Kong', 'Mario Kart', 'Super Smash Bros']
    },
    {
      title: 'Board',
      content: ['Monopoly', 'Clue', 'Battle-Ship', 'Sorry']
    }
  ],
  modalVisible: false,
  modalTitle: '',
  modalDescription: '',
  modalImage: '',
  modalStartTime: '',
  modalEndTime: '',
  modalLocation: ''
  };

  this._renderHeader = this._renderHeader.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  // const sections = this.state.SECTIONS;
  //   this.setState({
  //     
  //   });
  // }
  setModalVisible(visible, title, startTime, endTime, location, extendedDescription, image) {
    this.setState({
      modalVisible: visible,
      modalTitle: title,
      modalStartTime: startTime,
      modalEndTime: endTime,
      modalLocation: location,
      modalDescription: extendedDescription,
      modalImage: image});
  }



  _renderHeader(section) {
    return (
      <View animation= 'bounceIn' delay= {400}>
        <Text style={styles.header}>{section.title}</Text>
      </View>
    );
  }
   _renderContent(section) {
     return (
       <View>
         {
           section.content.sort().map((game, index) => {
             return (
                <Text style={styles.title} key={index}>{game}</Text>
             );
           })

       }
       </View>
     );
   }

   render() {
     return (
       <View>
       {/* <Modal
         animationType={'slide'}
         transparent={false}
         visible={this.state.modalVisible}
         onRequestClose ={() => {
           this.setModalVisible(!this.state.modalVisible);
         }}>
         <View style= {styles.innerContainer}>
           <Text style={styles.modaltitle}>{this.state.modalTitle}</Text>
           <Text style={styles.modaldatetime}>{this.state.modalStartTime} - {this.state.modalEndTime}</Text>
           <Text style ={styles.modaldatetime}>{this.state.modalLocation}</Text>
           <ScrollView>
           <View style ={{alignItems: 'center'}}>
               <Image source={{uri: this.state.modalImage}} style={styles.modalimage}/>
          </View>
           <Text style = {styles.modaldescription}>{this.state.modalDescription}</Text>
         </ScrollView>
           <View style ={styles.center}>
           <TouchableHighlight onPress={() => {
             this.setModalVisible(!this.state.modalVisible);
           }}>
             <View><CloseIcon/></View>
           </TouchableHighlight>
         </View>
         </View>
       </Modal> */}

       <Accordion
         sections={this.state.SECTIONS}
         renderHeader={this._renderHeader}
         renderContent={this._renderContent}
       />
     </View>
     );
   }

}
