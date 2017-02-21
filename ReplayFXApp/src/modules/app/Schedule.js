// This was "Scroll Tab View"

import React, {Component} from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';
import styles from './StyleSheet';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
//import NewTabBar from './replay_scroll_tab_view';
import ScheduleListView from './ScheduleListView';
import ScheduleData, {Types} from './ReplayFX_Axios';

//This is a class that has all the info for our swipeable nav bar
export default class Scroll_Tab_View extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //this array gets filled when people start "starring" their schedule
      favorites: [],
      //Array of types of events that will become the names of the tabs
      baseTabs: [
        //hard-coded
        {DisplayName: 'Experience', Name: 'all'},
        {DisplayName: 'My Schedule', Name: 'favorites'}
      ],
      baseSchedule: []
    };

    //binding so we know what 'this' is in reference to the class
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.loadSchedule = this.loadSchedule.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
    this.loadTypes = this.loadTypes.bind(this);
    this.loadLocalSchedule = this.loadLocalSchedule.bind(this);
    this.loadLocalTypes = this.loadLocalTypes.bind(this);

    //callbacks
    setTimeout(this.loadLocalTypes, 1500);
    setTimeout(this.loadTypes, 2500);
    this.loadLocalSchedule();
    this.loadSchedule();
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
      this.setState({baseSchedule: results.data});
      AsyncStorage.setItem('all', JSON.stringify(results.data));
    });
  }
  loadLocalSchedule() {
    AsyncStorage.getItem('all', (err, value) => {
      if (value !== null) {
        this.setState({baseSchedule: JSON.parse(value)});
      }
    });
  }

  //Axios call that receives category types and stores the data
  loadTypes() {
    Types().then((results) => {
      this.setState({tabs: [...this.state.baseTabs, ...results.data]});
      AsyncStorage.setItem('types', JSON.stringify(results.data));
    });
  }

  loadLocalTypes() {
   //AsyncStorage.removeItem('types');
    AsyncStorage.getItem('types', (err, value) => {
      if (value !== null) {
        this.setState({baseTabs: [...this.state.baseTabs, ...JSON.parse(value)]});

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
          {return (<View style={styles.slide} tabLabel= {item.DisplayName} key = {index} >
            {/* passing the state of the length of the favorites so it's displayed in the
            'my schedule' section on the swipeable nav bar */}
            <ScheduleListView
              //rendering the state based on whether an item is in the favorites array or not
              typeIs={item.Name}
              favorites={this.state.favorites}
              removeFavorite={this.removeFavorite}
              addFavorite={this.addFavorite}
              baseSchedule={this.state.baseSchedule}/>
          </View>);})}
        </ScrollableTabView>
    );
  }
}
