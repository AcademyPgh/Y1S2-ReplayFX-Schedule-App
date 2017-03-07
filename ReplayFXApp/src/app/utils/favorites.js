export function addFavorite(id) {

let favorites = [...this.state.favorites, id];
    this.setState({favorites});

    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
}

export function removeFavorite(id) {
 
 let favorites = _.pull(this.state.favorites, id);
    this.setState({favorites});
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));


}