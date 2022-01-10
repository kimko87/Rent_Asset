import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ card, deleteCard }) => {
  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
      <div className="card">
        <img
          className="card-img-top"
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
            {card.assetAddress}
          </p>
          <p>
            <Link to={`/my-assets/edit/${card._id}`}>
              <i className="fas fa-edit ms-1"></i>
              Edit your post
            </Link>
            <Link to='#' className="ms-4 text-danger" onClick={() => deleteCard(card._id)} >
              <i className="fas fa-trash-alt me-1 text-danger"></i>
              Delete your post
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Card;