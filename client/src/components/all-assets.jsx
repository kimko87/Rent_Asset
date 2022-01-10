import React, { Component } from 'react';
import PageHeader from "../components/common/page-header";
import CardPublic from './card-public';
import cardService from '../services/cardService';
import { saveToFavorites, getCurrentUser } from '../services/userService';
import { toast } from 'react-toastify';
import SearchBox from '../SearchBox/searchbox';
import SearchResult from './search-result';
class AllAssets extends Component {

  state = {
    cards: [],
    searchField: '',
  }

  async componentDidMount() {
    const { data } = await cardService.getAllCards();
    if (data.length > 0) this.setState({ cards: data });
  }

  addToFavorites = (cardId, userId) => {
    saveToFavorites(cardId, userId)
    toast.error("The asset was added to your favorites.")
  }

  render() {

    const { cards, searchField } = this.state;
    const user = getCurrentUser();

    const filteredAssets = cards.filter(card => (
      card.assetName.toLowerCase().includes(searchField.toLowerCase())));

    console.log(filteredAssets);

    return (
      <div className="container">

        <PageHeader>Assets available for rent</PageHeader>
        <SearchBox placeholder={"Enter asset name..."}
          handleChange={(e) => this.setState({ searchField: e.target.value })}
        />
        <div className="row">
          <div className="col-12 mt-4">
            {cards.length > 0 && <p>you can also add specific assets to your favorites and get back to them later...</p>}
          </div>
        </div>
        <div className="row">
          {!!filteredAssets.length ? filteredAssets.map(filteredAsset => <SearchResult addToFavorites={this.addToFavorites} filteredAsset={filteredAsset} user={user} key={filteredAsset._id} />) :
            cards.map(card => <CardPublic addToFavorites={this.addToFavorites} card={card} user={user} key={card._id} />)
          }
        </div>
      </div >
    );
  }
}

export default AllAssets;