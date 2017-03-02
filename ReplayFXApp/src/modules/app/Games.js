import React, {Component} from 'react';
import {View, Text} from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import styles, {stylechoice} from './StyleSheet';

const SECTIONS = [
  {
    title: 'Arcade',
    content: ['Streets of Rage', 'Arkanoid', 'Pac-Man'],
  },
  {
    title: 'Pinball',
    content: ['Walking Dead', 'Monopoly', 'A something or another'],
  }
];


export default class Games extends Component {
  constructor(props){
  super(props);
  this.state = {
    gameSectionHeader: ['Arcade', 'Pinball'],
    arcadeGames: ['Streets of Rage', 'Arkanoid', 'Pac-Man'],
    pinballGames: ['Walking Dead', 'Monopoly', 'A something or another']
  };

  this._renderHeader = this._renderHeader.bind(this);
  }
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  }
  // _renderHeader() {
  //    return (
  //      <View style={styles.header}>
  //        {this.state.gameSectionHeader.map((game, index) => {
  //          return (
  //        <Text style={styles.headerText}>{game}</Text>
  //      );
  //    })}
  //      </View>
  //    );
  //  }

   _renderContent(section) {
     return (
       <View style={styles.description}>
         {
           section.content.map((game, index) => {
             return (
                <Text key= {index}>{game}</Text>
             );
           })

       }
       </View>
     );
   }

   render() {
     return (
       <Accordion
         sections={SECTIONS}
         renderHeader={this._renderHeader}
         renderContent={this._renderContent}
       />
     );
   }

}
