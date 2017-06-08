import React, {Component} from 'react';
import {TouchableHighlight} from 'react-native';
import {View, Text} from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import styles, {stylechoice} from '../styles/StyleSheet';
import CloseIcon from '../utils/closeIcon';
import GameModal from '../components/GameModal';
import _ from 'lodash';
import GameDivider from '../utils/GameDivider';

export default class Games extends Component {
  constructor(props){
  super(props);
  this.state = {
  gamesByGameType: GameDivider(this.props.baseGameTypes, this.props.baseGames),
  gameModalVisible: false,
  gameModalTitle: '',
  gameModalReleaseDate: '',
  gameModalLocation: '',
  gameModalDeveloper: '',
  gameModalGenre: '',
  gameModalPlayers: '',
  gameModalOverview: '',
  gameModalImage: '',
  // modalImage: '',

};
  this._renderHeader = this._renderHeader.bind(this);
  this._renderContent = this._renderContent.bind(this);
  this.setModalVisible = this.setModalVisible.bind(this);
  }


  setModalVisible(visible, gameTitle, releaseDate, location, developer, genre, players, overview, imageUrl) {
    this.setState({
      gameModalVisible: visible,
      gameModalTitle: gameTitle,
      gameModalReleaseDate: releaseDate,
      gameModalLocation: location,
      gameModalDeveloper: developer,
      gameModalGenre: genre,
      gameModalPlayers: players,
      gameModalOverview: overview,
      gameModalImage: imageUrl,
      });
  }

renderLocationMap(locationArray) {
return (locationArray.map(function(location){
    return(
      location.location
    );
}).join(', ')
)}


  _renderHeader(section, index) {
    return (
      <View animation= 'bounceIn' delay= {400} key={section.title}>
        <Text style={styles.gamesHeader}>{section.title}</Text>
    </View>
    );
  }

   _renderContent(section) {
     return (
       <View>
         {   section.content.map((item) => {
             return (

               <TouchableHighlight key ={item.id} onPress= {() => this.setModalVisible(true, item.gameTitle, item.releaseDate, this.renderLocationMap(item.replayGameLocations), item.developer, item.genre, item.players, item.overview, item.imageUrl)}>
               <View style= {styles.gameTitleLocation} >
                <Text style={styles.title}>{item.gameTitle}</Text>
                <Text>{this.renderLocationMap(item.replayGameLocations)}</Text>
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
       <GameModal
        gameModalVisible={this.state.gameModalVisible}
        gameModalTitle={this.state.gameModalTitle}
        gameModalReleaseDate={this.state.gameModalReleaseDate}
        gameModalLocation={this.state.gameModalLocation}
        gameModalDeveloper={this.state.gameModalDeveloper}
        gameModalGenre={this.state.gameModalGenre}
        gameModalPlayers={this.state.gameModalPlayers}
        gameModalOverview={this.state.gameModalOverview}
        gameModalImage={this.state.gameModalImage}
        setModalVisible={() => this.setModalVisible(false)}
      />
       <Accordion
         sections={this.state.gamesByGameType}
         renderHeader={this._renderHeader}
         renderContent={this._renderContent}
       />
     </View>
     );
   }

}
