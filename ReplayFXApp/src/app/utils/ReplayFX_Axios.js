import axios from 'axios';

const ScheduleData = () => {

  return axios('https://replayfxcalendar.azurewebsites.net/schedule');
};

export const Types = () => {
  return axios('https://replayfxcalendar.azurewebsites.net/public/categories');
};

export const GameData = () => {

  return axios('https://replayfxcalendar.azurewebsites.net/games');
}

export default ScheduleData;
