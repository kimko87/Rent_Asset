import React, { Component } from 'react';
import PageHeader from "../components/common/page-header";
import Card from './card';
import cardService from "../services/cardService";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

class MyAssets extends Component {

  state = {

    cards: []
  }

  async componentDidMount() {
    const { data } = await cardService.getMyCards();

    if (data.length > 0) this.setState({ cards: data });
  }

  deleteCard = (cardId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let cards = [...this.state.cards];
        cards = cards.filter(card => card._id !== cardId);
        this.setState({ cards });
        toast.error('The post was deleted');
        await cardService.deleteCard(cardId);
      }
    })
  }

  render() {

    const { cards } = this.state;

    return (
      <div className="container">
        <PageHeader>My Assets</PageHeader>
        <div className="row">
          <div className="col-12 mt-4">
            <Link className="btn btn-danger text-dark mb-4" to="/create-asset">Create New Asset</Link>
            {cards.length > 0 && <p>Your assets in the list below</p>}
          </div>
        </div>
        <div className="row">
          {cards.length > 0 &&
            cards.map(card => <Card deleteCard={this.deleteCard} card={card} key={card._id} />)
          }
        </div>
      </div >
    );
  }
}

export default MyAssets;