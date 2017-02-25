//This was some of "content"

import React, {Component} from 'react';
import {
  ListView,
  Alert
} from 'react-native';
import styles, {stylechoice} from '../styles/StyleSheet';
import ScheduleDataDivider from '../utils/ScheduleDataDivider';
import {createAnimatableComponent, View, Text} from 'react-native-animatable';
//import ScheduleItem from '../components/ScheduleItem';
//import MoreInfoButton from '../components/MoreInfoButton';
import AddFavoriteButton from '../components/AddFavoriteButton';
//import ScheduleModal from '../components/ScheduleModal';


export default class ScheduleListView extends Component {
  constructor(props) {
    super(props);
    //this renders out each schedule item
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(ScheduleDataDivider(this.props.typeIs, this.props.favorites, this.props.baseSchedule)),
      modalVisible: false,
      modalTitle: '',
      modalDescription: '',
      modalImage: '',
      modalStartTime: '',
      modalEndTime: '',
      modalLocation: ''
    };
    this.renderScheduleItem = this.renderScheduleItem.bind(this);
    this.handleModalVisible = this.handleModalVisible.bind(this);
    this.handleFavoriteButtonPress=this.handleFavoriteButtonPress.bind(this);
    this.handleAnimateFavorite=this.handleAnimateFavorite.bind(this);
   
  }
  componentWillReceiveProps(nextProps) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.setState({
      dataSource: ds.cloneWithRowsAndSections(ScheduleDataDivider(nextProps.typeIs, nextProps.favorites, nextProps.baseSchedule))
    });
  }

  renderSectionHeader(sectionData, category) {
    let d = new Date(category);

    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let n = weekday[d.getDay()];
    return (<View animation= 'bounceIn' delay= {400}>
      <Text style={styles.header}>{n}</Text>
    </View>);
  }

  handleFavoriteButtonPress(props){
    if (props.isFavorite){
            this.props.removeFavorite(props.id);
            Alert.alert('Item has been removed from your schedule')
          }
          else {
            this.props.addFavorite(props.id);
            Alert.alert('Item has been added to your schedule');
          }
    }

    handleAnimateFavorite(props) {
      if (props.isFavorite){
        props.favoriteColor='stylechoice.accentcolor'
       'bounce'
      }
      else {
        props.favoriteColor='stylechoice.inactive'
        'shake'}
      delay = 400;
    }
  
  handleModalVisible(visible, title, startTime, endTime, location, extendedDescription, image) {
    this.setState({
      modalVisible: visible,
      modalTitle: title,
      modalStartTime: startTime,
      modalEndTime: endTime,
      modalLocation: location,
      modalDescription: extendedDescription,
      modalImage: image});
  }


renderScheduleItem (item) {
    return (
      <View style = {styles.info}>
        <Text animation='flipInY' delay={400} style={styles.title}>{item.title}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}> {item.startTime} - {item.endTime}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}>{item.location}</Text>
        <Text animation='flipInY' delay={400} style={styles.description}>{item.description}</Text>
      <View style={styles.iconrowstyle}>
      {/*<MoreInfoButton
        extendedDescription={item.extendedDescription}
        image={item.image}
        onSetModalVisible={this.handleModalVisible(true, item.title, item.startTime, item.endTime, item.location, item.extendedDescription, item.image)}/>*/}
      <AddFavoriteButton 
        id={item.id}
        isFavorite={item.id.isFavorite}
        onFavoriteButtonPress={this.handleFavoriteButtonPress}
        animateFavorite={this.handleAnimateFavorite}
        favoriteColor={item.id.favoriteColor}
        />
      </View>
      </View>
    );
  }
/*
  /*renderScheduleItem(item) {
    return(
    <ScheduleItem
    title="Hi there"
    />
    )
*/


                  // startTime: this.startTime,
                  // endTime: this.endTime,
                  // location: this.location,
                  // description: this.description,
                  // extendedDescription: this.extendedDescription,
                  // image: this.image,
                  // onSetModalVisible: this.handleModalVisible(true, this.title, this.startTime, this.endTime, this.location, this.extendedDescription, this.image),
                  // onFavoriteButtonPress: this.handleFavoriteButtonPress,
                  // animateFavorite: this.handleAnimateFavorite,
                  // favoriteColor: this.favoriteColor,
                  // isFavorite: this.isFavorite,
                  // modalVisible: this.modalVisible,
                  // modalTitle: this.modalTitle,
                  // modalStartTime: this.modalStartTime,
                  // modalEndTime: this.modalEndTime,
                  // modalLocation: this.modalLocation

  render() {
    return (
      <View style={styles.container}>
        {/*<ScheduleModal 
        modalVisible={this.state.modalVisible}
        modalTitle={this.state.modalTitle}
        modalStartTime={this.state.modalStartTime}
        modalEndTime={this.state.modalEndTime}
        modalLocation={this.state.modalLocation}
        onSetModalVisible={this.handleModalVisible(!this.state.modalVisible)}/>*/}
        <ListView
          styles={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this.renderScheduleItem}
          renderSectionHeader={this.renderSectionHeader}
      />
      </View>
    );
  }
}


      