import _ from 'lodash';
// sorts content into sections based on the types (if it's a favorite, all, movie, etc.)
const content_sections = (data, favorites, schedule) => {
  let dataMap = {};
  schedule.forEach((event) => {
    if (_.indexOf(favorites, event.id) > -1)
    {event.isFavorite = true;
      if (!_.some(event.replayEventTypes, (row) => {
        return row.name === 'favorites';}
      ))
      {event.replayEventTypes.push({name: 'favorites'});
      }
    }
    else
    {
      event.isFavorite = false;
      _.remove(event.replayEventTypes, (row) => {
        if (row.name === 'favorites')
        {return true;}
        else
        {return false;}
      });
    }
    if (data === 'all') {
      if (!dataMap[event.date]) {
        dataMap[event.date] = [];
      }

      dataMap[event.date].push(event);

    }
    else {
      event.replayEventTypes.forEach((category) => {
        if (category.name === data) {
          if (!dataMap[event.date]) {
            dataMap[event.date] = [];
          }
          dataMap[event.date].push(event);
        }
      });
    }
  });

  return dataMap;
};

export default content_sections;
