import React, {Component} from 'react';
import {TouchableHighlight, Modal, ScrollView} from 'react-native';
import {View, Text} from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import styles, {stylechoice} from '../styles/StyleSheet';
import CloseIcon from '../utils/closeIcon';
import _ from 'lodash';

export default class Games extends Component {
  constructor(props){
  super(props);
  this.state = {
    SECTIONS: [
      {
      title: 'Arcade',
      content: [
        {gameTitle: 'Streets of Rage', location: 'A1'},
        {gameTitle: 'Arkanoid', location: 'A2'},
        {gameTitle: 'Pac-Man', location: 'A3'}],
    },
    {
      title: 'Pinball',
      content: [
        {gameTitle: 'Walking Dead', location: 'B1'},
        {gameTitle: 'Monopoly', location: 'B2'},
        {gameTitle:'A something or another', location: 'B3'}],
    },
    {
      title: 'Console',
      content: [
        {gameTitle: 'Sonic', location: 'C1'},
        {gameTitle: 'Super Mario', location: 'C2'},
        {gameTitle: 'Donkey Kong', location: 'C3'},
        {gameTitle: 'Mario Kart', location: 'C4'},
        {gameTitle:'Super Smash Bros', location: 'C5'}
      ]
    },
    {
      title: 'Board',
      content: [
        {gameTitle: 'Monopoly', location: 'D1'},
        {gameTitle: 'Clue', location: 'D2'},
        {gameTitle: 'Battle-Ship', location: 'D3'},
        {gameTitle: 'Sorry', location: 'D4'}
      ]
    }
  ],
  modalVisible: false,
  modalTitle: '',
  modalOverview: '',
  // modalImage: '',

  modalLocation: '',
  modalReleaseDate: '',
  modalDeveloper: '',
  modalGenre: '',
  modalPlayers

  };

  this._renderHeader = this._renderHeader.bind(this);
  this._renderContent = this._renderContent.bind(this);
  this.setModalVisible = this.setModalVisible.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  // const sections = this.state.SECTIONS;
  //   this.setState({
  //
  //   });
  // }

  setModalVisible(visible, title, location, description) {
    this.setState({
      modalVisible: visible,
      modalTitle: title,
      modalLocation: location,
      modalOverview: overview,
      modalReleaseDate: releaseDate,
      modalDeveloper: developer,
      modalGenre: genre,
      modalPlayers: players
      });
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
           section.content.map((game, index) => {
             return (

               <TouchableHighlight onPress= {() => {
                 this.setModalVisible(true, game.gameTitle, game.location, game.overview, game.releaseDate, game.developer, game.genre, game.players);
               }}>
               <View style= {styles.gameTitleLocation} key= {game.id}>
                <Text style={styles.title}>{game.gameTitle}</Text>
                <Text style={styles.title}>{game.location}</Text>
              </View>
              </TouchableHighlight>
             );
           })

       }
       </View>
     );
   }

   render() {
     return (
       <View>
       <Modal
         animationType={'slide'}
         transparent={false}
         visible={this.state.modalVisible}
         onRequestClose ={() => {
           this.setModalVisible(!this.state.modalVisible);
         }}>
         <View style= {styles.innerContainer}>
           <Text style={styles.modaltitle}>{this.state.modalTitle}</Text>
           {/* <Text style={styles.modaldatetime}>{this.state.modalStartTime} - {this.state.modalEndTime}</Text> */}
           <Text style ={styles.modaldatetime}>{this.state.modalLocation}</Text>
           <ScrollView>
           {/* <View style ={{alignItems: 'center'}}>
               <Image source={{uri: this.state.modalImage ? this.state.modalImage : ''}} style={styles.modalimage}/>
          </View> */}
           {/* <Text style = {styles.modaldescription}>{this.state.modalDescription}</Text> */}
         </ScrollView>
           <View style ={styles.center}>
           <TouchableHighlight onPress={() => {
             this.setModalVisible(!this.state.modalVisible);
           }}>
             <View><CloseIcon/></View>
           </TouchableHighlight>
         </View>
         </View>
       </Modal>

       <Accordion
         sections={this.state.SECTIONS}
         renderHeader={this._renderHeader}
         renderContent={this._renderContent}
       />
     </View>
     );
   }

}
