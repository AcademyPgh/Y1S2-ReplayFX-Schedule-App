

const GameDivider = (gametypes, games) => {
    let sections = [];
    gametypes.forEach((type) => {
        sections.push({'title': type.Name, 'content':[]})
         games.forEach((game) => { 
            if (game.replayGameType.name === type.Name) {
                sections.filter((obj) => {
                    if (!obj.title)
                    return;
                    if (obj.title === game.replayGameType.name)
                        obj.content.push(game);
            });
         }
         });
        })
                  return sections;
    };

    export default GameDivider;
