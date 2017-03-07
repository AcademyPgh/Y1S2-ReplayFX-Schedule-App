//This was some of "content"

import React, {Component} from 'react';
import {
  ListView,
  Alert,
  View
} from 'react-native';
import styles, {stylechoice} from '../styles/StyleSheet';
import ScheduleDataDivider from '../utils/ScheduleDataDivider';
import ScheduleItem from '../components/ScheduleItem';
//import MoreInfoButton from '../components/MoreInfoButton';
//import AddFavoriteButton from '../components/AddFavoriteButton';
import ScheduleModal from '../components/ScheduleModal';
import SectionHeader from '../components/SectionHeader';


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


  handleFavoriteButtonPress(item){
    
    if (item.isFavorite){
            this.props.removeFavorite(item.id);
          //  Alert.alert('Item has been removed from your schedule');
          }
          else {
            this.props.addFavorite(item.id);
        //    Alert.alert('Item has been added to your schedule');
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
            item={item}
            onSetModalVisible= {() => this.handleModalVisible(true, item.title, item.startTime, item.endTime, item.location, item.extendedDescription, item.image)}
            onFavoriteButtonPress={this.handleFavoriteButtonPress}
            />)}

  renderSectionHeader(sectionData, category) {
    return (
      <SectionHeader sectionData= {sectionData} category= {category}/>
    )
  }
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
      