import React from 'react';
import { Link } from 'react-router-dom';


const CardPublic = ({ card, addToFavorites, user }) => {

  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
      <div className="card ">
        <img
          className="card-img-top "
          src={card.assetImage}
          width=""
          alt={card.assetName}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{card.assetName}</h5>
          <p className="card-text">{card.assetDescription}</p>
          <p className="card-text border-top pt-2">
            <b>Tel: </b>
            {card.assetPhone}
            <br />
            <b>Address: </b>
            {card.assetAddress}
          </p>
          <p>
            <i className="far fa-heart text-danger me-2"></i>
            <Link to="#" className="text-danger" onClick={() => addToFavorites(card._id, user._id)}>Add to favorites</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardPublic;