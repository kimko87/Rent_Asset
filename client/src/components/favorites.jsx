import React, { Component } from 'react';
import userMethods from '../services/userService';
import CardFavorite from './card-favorite';
import PageHeader from './common/page-header';
import cardService from '../services/cardService';


class Favorites extends Component {


  state = {

    cards: [],


  };

  async componentDidMount() {

    const { data } = await userMethods.getUserFavorites();

    const favoritesArray = data.favorites;

    for (var cardId of favoritesArray) {
      const { data } = await cardService.getFavoritesCards(cardId);
      let arr = [...this.state.cards];
      arr.push(data);
      this.setState({ cards: arr })
    }
  }

  render() {

    const { cards } = this.state;

    return (

      <div className="container" >
        <PageHeader>My favorites</PageHeader>
        <div className="row">
          <div className="col-12 mt-4">
            {cards.length > 0 && <p>This are the chosen one's...</p>}
          </div>
        </div>
        <div className="row">
          {cards.length > 0 &&
            cards.map(card => <CardFavorite card={card} key={card._id} />)
          }
        </div>
      </div>

    );
  }
}

export default Favorites;
