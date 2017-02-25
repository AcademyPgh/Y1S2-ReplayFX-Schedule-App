//This was some of "content"
import React, {Component} from 'react';
import {

  ListView,
  Alert,
  TouchableHighlight,
  Modal,
  Image,
  ScrollView
} from 'react-native';
import styles, {stylechoice} from './StyleSheet';
import ScheduleDataDivider from './ScheduleDataDivider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Info_Icon from '../utils/Info_Icon';
import CloseIcon from '../utils/closeIcon';
//import Collapsible from 'react-native-collapsible';
//import Accordion from 'react-native-collapsible/Accordion';
import {createAnimatableComponent, View, Text} from 'react-native-animatable';
import SectionHeader from '../actions/SectionHeader';

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
    this.setModalVisible = this.setModalVisible.bind(this);
    this.renderInfoButton = this.renderInfoButton.bind(this);
   // this.timeConverter = this.timeConverter.bind(this);

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

  setModalVisible(visible, title, startTime, endTime, location, extendedDescription, image) {
    this.setState({
      modalVisible: visible,
      modalTitle: title,
      modalStartTime: startTime,
      modalEndTime: endTime,
      modalLocation: location,
      modalDescription: extendedDescription,
      modalImage: image});
  }
//   timeConverter(time) {
//     let times = time.split(':'); // convert to array

//   // fetch
//     let hours = Number(times[0]);
//     let minutes = Number(times[1]);

//   // calculate
//     var timeValue = '' + ((hours > 12) ? hours - 12 : hours);  // get hours
//     timeValue += (minutes < 10) ? ':0' + minutes : ':' + minutes;  // get minutes
//     timeValue += (hours >= 12) ? ' PM' : ' AM';

//     return timeValue; // get AM/PM
//   }

  renderInfoButton(item) {
    // let mstarttime = this.timeConverter(item.startTime);
    // let mendtime = this.timeConverter(item.endTime);
    if (item.extendedDescription || item.image)
    {return (
  <TouchableHighlight onPress={() => {
    this.setModalVisible(true, item.title, item.startTime, item.endTime, item.location, item.extendedDescription, item.image);
  }}>
    <View>
      <Info_Icon/>
    </View>
  </TouchableHighlight>
    );}
    else
    {return (<View/>);
    }
  }

  renderScheduleItem(item) {
    // let starttime = this.timeConverter(item.startTime);
    // let endtime = this.timeConverter(item.endTime);
    return (

      <View style = {styles.info}>
        <Text animation='flipInY' delay={400} style={styles.title}>{item.title}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}> {item.startTime} - {item.endTime}</Text>
        <Text animation='flipInY' delay={400} style={styles.datetime}>{item.location}</Text>
        <Text animation='flipInY' delay={400} style={styles.description}>{item.description}</Text>
      <View style={styles.iconrowstyle}>

      {this.renderInfoButton(item)}

        <TouchableHighlight onPress={() => {
          if (item.isFavorite)
          {
            this.props.removeFavorite(item.id);
            Alert.alert('Item has been removed from your schedule')
          }
          else {
            this.props.addFavorite(item.id);
            Alert.alert('Item has been added to your schedule');
          }
        }}>
          <View style={styles.infoIcon} animation= {item.isFavorite ? 'bounce' : 'shake'} delay={400}>
             <Ionicons name= 'ios-game-controller-b' size={36}
               color= {item.isFavorite ? stylechoice.accentcolor : stylechoice.inactive} />
             </View>
           </TouchableHighlight>
       </View>
      </View>
    );
  }

  renderSectionHeader(sectionData, category) {
    return (
      <SectionHeader sectionData= {sectionData} category= {category}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose ={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style= {styles.innerContainer}>
            <Text style={styles.modaltitle}>{this.state.modalTitle}</Text>
            <Text style={styles.modaldatetime}>{this.state.modalStartTime} - {this.state.modalEndTime}</Text>
            <Text style ={styles.modaldatetime}>{this.state.modalLocation}</Text>
            <ScrollView>
            <View style ={{alignItems: 'center'}}>
                <Image source={{uri: this.state.modalImage}} style={styles.modalimage}/>
           </View>
            <Text style = {styles.modaldescription}>{this.state.modalDescription}</Text>
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
