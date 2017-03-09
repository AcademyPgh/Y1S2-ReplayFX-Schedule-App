  export function timeConverter(time) {
    let times = time.split(':'); // convert to array

  // fetch
    let hours = Number(times[0]);
    let minutes = Number(times[1]);

  // calculate
    var timeValue = '' + ((hours > 12) ? hours - 12 : hours);  // get hours
    timeValue += (minutes < 10) ? ':0' + minutes : ':' + minutes;  // get minutes
    timeValue += (hours >= 12) ? ' PM' : ' AM';

    return timeValue; // get AM/PM
  }