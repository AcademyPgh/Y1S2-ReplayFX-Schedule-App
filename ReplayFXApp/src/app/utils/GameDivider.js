

const GameDivider = (gametypes, games) => {
    let sections = [];
    gametypes.forEach((type) => {
        var titleAndContent = {'title': type.Name, 'content':[]}
        games.forEach((game) => {
            if (game.replayGameType.name === type.Name) {
                        titleAndContent.content.push(game);
            };
         });
         sections.push(titleAndContent);
         });
                  return sections;
    };

    export default GameDivider;
