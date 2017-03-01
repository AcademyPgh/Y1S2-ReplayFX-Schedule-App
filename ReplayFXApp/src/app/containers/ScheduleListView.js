//This was some of "content"

import React, {Component} from 'react';
import {
  ListView,
  Alert
} from 'react-native';
import styles, {stylechoice} from '../styles/StyleSheet';
import ScheduleDataDivider from '../utils/ScheduleDataDivider';
import {createAnimatableComponent, View, Text} from 'react-native-animatable';
import ScheduleItem from '../components/ScheduleItem';
//import MoreInfoButton from '../components/MoreInfoButton';
//import AddFavoriteButton from '../components/AddFavoriteButton';
import ScheduleModal from '../components/ScheduleModal';


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
      modalLocation: '',
      isFavorite: false,
      animation: "",
      favoriteColor: "inactive"

    };
  this.renderScheduleItem = this.renderScheduleItem.bind(this);
    this.handleModalVisible = this.handleModalVisible.bind(this);
   this.handleFavoriteButtonPress=this.handleFavoriteButtonPress.bind(this);

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

  handleFavoriteButtonPress(isFavorite, favoriteColor, animation, props){
    
    if (isFavorite){
          this.setState ({
            isFavorite: false,
            favoriteColor: stylechoice.inactive,
            animation: "shake"
          })  
            this.props.removeFavorite(props);
            Alert.alert('Item has been removed from your schedule');
          }
          else {
            this.setState ({
              isFavorite: true,
              favoriteColor: stylechoice.accentcolor,
              animation: "bounce"
            })
            this.props.addFavorite(props);
            Alert.alert('Item has been added to your schedule');
          }
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

 renderScheduleItem(item) {
   return(
      <ScheduleItem 
            title={item.title}
            startTime= {item.startTime}
            endTime= {item.endTime}
            location= {item.location}
            description= {item.description}
            extendedDescription= {item.extendedDescription}
            image= {item.image}
            id={item.id}
            onSetModalVisible= {() => this.handleModalVisible(true, item.title, item.startTime, item.endTime, item.location, item.extendedDescription, item.image)}
            onFavoriteButtonPress={() =>this.handleFavoriteButtonPress(item.isFavorite, item.favoriteColor, item.animation )}
            />)}

  render() {
    return (
      <View style={styles.container}>
        <ScheduleModal
        modalVisible={this.state.modalVisible}
        modalStartTime={this.state.modalStartTime}
        modalEndTime={this.state.modalEndTime}
        modalLocation={this.state.modalLocation}
        modalImage={this.state.modalImage}
        modalDescription={this.state.modalDescription}
        onSetModalVisible={() => this.handleModalVisible(false)}
         />
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
      