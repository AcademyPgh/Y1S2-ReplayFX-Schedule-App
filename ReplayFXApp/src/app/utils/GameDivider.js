import _ from 'lodash';

const GameDivider = (gametype, games) => {
    let dataMap = {}
        games.forEach((game) => {
            dataMap[gametype].push(game)
        });
        return dataMap;
        };
    export default GameDivider;
