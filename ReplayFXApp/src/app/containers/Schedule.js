// This was "Scroll Tab View"
import React, {Component} from 'react';
import {
  View,
  AsyncStorage,
  Platform
} from 'react-native';
import styles from '../styles/StyleSheet';
import _ from 'lodash';
import ScrollableTabView from '../utils/react-native-scrollable-tab-view';
import NewTabBar from '../utils/replay_scroll_tab_view';
import ScheduleListView from './ScheduleListView';
import ScheduleData, {Types, GameData, GameTypes} from '../utils/ReplayFX_Axios';
import Games from './Games';

//This is a class that has all the info for our swipeable nav bar
export default class Schedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      //this array gets filled when people start "starring" their schedule
      favorites: [],
      //Array of types of events that will become the names of the tabs
      baseTabs: [
        //hard-coded
        {DisplayName: 'Experience', Name: 'all'},
        {DisplayName: 'My Schedule', Name: 'favorites'},
        {DisplayName: 'Games', Name: 'Games'}
      ],
      baseSchedule: [],
      baseGameTypes: [],
      baseGames: []
    };

    //binding so we know what 'this' is in reference to the class
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.loadSchedule = this.loadSchedule.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
    this.loadTypes = this.loadTypes.bind(this);
    this.loadGames = this.loadGames.bind(this);
    this.loadLocalGames = this.loadLocalGames.bind(this);
    this.loadGameTypes = this.loadGameTypes.bind(this);
    this.loadLocalGameTypes = this.loadLocalGameTypes.bind(this);
    this.loadLocalSchedule = this.loadLocalSchedule.bind(this);
    this.loadLocalTypes = this.loadLocalTypes.bind(this);

    //callbacks
    setTimeout(this.loadTypes, 950);
    this.loadSchedule();
    this.loadGameTypes();
    this.loadGames();
    this.loadFavorites();
  }

  //function that loads favorites from local storage
  loadFavorites() {
    AsyncStorage.getItem('favorites', (err, value) => {
      if (value !== null) {
        this.setState({favorites: JSON.parse(value)});
      }

    });
  }
  //Axios call that gives baseSchedule its state and stores the data
  loadSchedule() {
      ScheduleData().then((results) => {
      this.setState({baseSchedule: [...results.data]});
      AsyncStorage.setItem('all', JSON.stringify(results.data));
    }).then(setTimeout(this.loadLocalSchedule, 1500));
  }

  loadLocalSchedule() {
    AsyncStorage.getItem('all', (err, value) => {
      if (value !== null) {
        this.setState({baseSchedule: [...JSON.parse(value)]});
      }
    });
  }
  //Axios call that receives category types and stores the data
  loadTypes() {
    Types().then((results) => {
      this.setState({tabs: [...this.state.baseTabs, ...results.data]});
      AsyncStorage.setItem('types', JSON.stringify(results.data));
      console.log("Reloading types");
    }).then(setTimeout(this.loadLocalTypes, 500));
  }

  loadLocalTypes() {
    AsyncStorage.getItem('types', (err, value) => {
      if (value !== null) {
       this.setState({baseTabs: [...this.state.baseTabs, ...JSON.parse(value)]});}
    });
  }
  loadGames () {
    GameData().then((results) => {
      this.setState({baseGames: results.data});
      AsyncStorage.setItem('games', JSON.stringify(results.data));
      console.log("I am refreshing Games");
    }).then(setTimeout(this.loadLocalGames, 1000));
  }

  loadLocalGames() {
    AsyncStorage.getItem('games', (err,value) => {
      if (value !== null) {
        this.setState({baseGames: JSON.parse(value)});
        console.log("I am loading LOCAL Games")
      }
    });
  }
loadGameTypes() {
  GameTypes().then((results) => {
    this.setState({baseGameTypes: results.data});
    AsyncStorage.setItem('gametypes', JSON.stringify(results.data));
  }).then(setTimeout(this.loadLocalGameTypes, 1500));
}
  loadLocalGameTypes () {
    AsyncStorage.getItem('gametypes', (err,value) => {
      if (value !== null) {
        this.setState({baseGameTypes: JSON.parse(value)});
      }
    });
  }

  //changes the state of favorites to add a new event id
  addFavorite(id)
  {
    let favorites = [...this.state.favorites, id];
    this.setState({favorites});

    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }
  //changes the state of favorite to remove event id
  removeFavorite(id)
{
    let favorites = _.pull(this.state.favorites, id);
    this.setState({favorites});
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }

  render() {

    return (
      // This returns the tabs from the array so we can see them on the screen!
        <ScrollableTabView renderTabBar = {() => <NewTabBar favoritesCount= {this.state.favorites.length}/>} >
          {this.state.baseTabs.map((item, index) =>
          {return (
            <View style={styles.slide} tabLabel= {item.DisplayName} key = {index} >
            {/* Passing the state of the length of the favorites so it's displayed in the
            'my schedule' section on the swipeable nav bar */}
            {item.DisplayName == 'Games' ? <Games
            baseGameTypes={this.state.baseGameTypes}
            baseGames={this.state.baseGames}/> : null}
            <ScheduleListView
              //rendering the state based on whether an item is in the favorites array or not
              typeIs={item.Name}
              favorites={this.state.favorites}
              removeFavorite={this.removeFavorite}
              addFavorite={this.addFavorite}
              baseSchedule={this.state.baseSchedule}
              loadSchedule={this.loadSchedule}
              loadTypes={this.loadTypes}
              loadGames={this.loadGames}
              />
          </View>

        );})}
        </ScrollableTabView>
    );
  }
}
