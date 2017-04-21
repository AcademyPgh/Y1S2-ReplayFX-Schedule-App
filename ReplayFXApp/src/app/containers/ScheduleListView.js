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
import PushController from '../components/PushController';



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
   this.timeConverter=this.timeConverter.bind(this);

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
            if(this.props.favorites.length < 1){
                 Alert.alert('Item has been added to your schedule');
             }
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
  timeConverter(time) {
    if(time){
    let times = time.split(':'); // convert to array

  // assigning hour and minute based on position in array
    let hours = Number(times[0]);
    let minutes = Number(times[1]);

  // calculate

    if (hours > 0 )
   { var timeValue = '' + ((hours > 12) ? hours - 12 : hours);  }
    else {
    var timeValue = '' + 12;
    }  // hours, converting military time, midnight
    timeValue += (minutes < 10) ? ':0' + minutes : ':' + minutes;  // make sure minutes looks right based on how many there are
    timeValue += (hours >= 12) ? ' PM' : ' AM'; //get AM/PM
  }
  else { // in case there is no end time.
    time = "";
    var timeValue = time;
}
return timeValue;
  }

 renderScheduleItem(item) {
   return(
     <View>
      <ScheduleItem
            timeConverter={this.timeConverter}
            item={item} //passing whole object
            onSetModalVisible= {() => this.handleModalVisible(true, item.title, this.timeConverter(item.startTime), this.timeConverter(item.endTime), item.location, item.extendedDescription, item.image)} //need to redefine the function otherwise tries to change state during render
            onFavoriteButtonPress={this.handleFavoriteButtonPress}
            />
            <PushController item= {item}/>

    </View>
          )}

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
