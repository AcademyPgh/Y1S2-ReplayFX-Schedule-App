import axios from 'axios';

const ScheduleData = () => {

  return axios('https://replayfxcalendar.azurewebsites.net/public');
};

export const Types = () => {
  return axios('https://replayfxcalendar.azurewebsites.net/public/categories');
};

export default ScheduleData;
