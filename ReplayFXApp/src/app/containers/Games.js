import React, {Component} from 'react';
import {} from 'react-native';
import {View, Text} from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import styles, {stylechoice} from '../styles/StyleSheet';
import CloseIcon from '../utils/closeIcon';
import GameModal from '../components/ScheduleModal';
import _ from 'lodash';
import MoreInfoButton from '../components/MoreInfoButton';
import GameDivider from '../utils/GameDivider';

export default class Games extends Component {
  constructor(props){
  super(props);
  this.state = {
  games: GameDivider(this.props.baseGameTypes, this.props.baseGames),
  gameTypes: this.props.baseGameTypes,
  gameModalVisible: false,
  gameModalTitle: '',
  gameModalReleaseDate: '',
  gameModalLocation: '',
  gameModalDeveloper: '',
  gameModalGenre: '',
  gameModalPlayers: '',
  gameModalOverview: '',
  // modalImage: '',
};

  this._renderHeader = this._renderHeader.bind(this);
  this._renderContent = this._renderContent.bind(this);
  this.handleGameModalVisible = this.handleGameModalVisible.bind(this);
  }


  handleGameModalVisible(visible, gameTitle, releaseDate, location, developer, genre, players, overview) {
    this.setState({
      gameModalVisible: visible,
      gameModalTitle: gameTitle,
      gameModalReleaseDate: releaseDate,
      gameModalLocation: location,
      gameModalDeveloper: developer,
      gameModalGenre: genre,
      gameModalPlayers: players,
      gameModalOverview: overview,
      });
  }


  _renderHeader(gameTypes) {
    return (
      <View animation= 'bounceIn' delay= {400}>
        { gametypes.map((gametype, id) => {
          return (
            <View key={gametype.id}>
            <Text style={styles.header}>{gametype}</Text>
            </View>
          );
          })
        }
        </View>
        )}
   _renderContent(games) {
     return (
       <View>
         {
           games.map((game, id) => {
             return (
               <View style= {styles.gameTitleLocation} key= {game.id}>
                <Text style={styles.title}>{game.gameTitle}</Text>
                <Text style={styles.title}>{game.location}</Text>
                <MoreInfoButton/>
              </View>
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
        gameModalVisible={this.state.modalVisible}
        gameModalTitle={this.state.modalTitle}
        gameModalReleaseDate={this.state.modalReleaseDate}
        gameModalLocation={this.state.modalLocation}  
        gameModalDeveloper={this.state.modalDeveloper}
        gameModalGenre={this.state.modalGenre}
        gameModalPlayers={this.state.modalPlayers}
        gameModalOverview={this.state.modalOverview}
        onSetModalVisible={() => this.handleGameModalVisible(false)}
      />
       <Accordion
         sections={this.state.games}
         renderHeader={this._renderHeader}
         renderContent={this._renderContent}
       />
     </View>
     );
   }

}
