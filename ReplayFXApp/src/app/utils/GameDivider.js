

const GameDivider = (gametypes, games) => {
    let sections = [];
    gametypes.forEach((type) => {
        var x = {'title': type.Name, 'content':[]}
        games.forEach((game) => { 
            if (game.replayGameType.name === type.Name) {
                        x.content.push(game);
            };
         });
         sections.push(x);
         });
                  return sections;
    };

    export default GameDivider;
