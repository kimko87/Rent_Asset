import React from 'react';


const CardFavorite = ({ card }) => {

  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
      <div className="card ">
        <img className="card-img-top" src={card.assetImage} alt={card.assetName} />
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
        </div>
      </div>
    </div>
  )
}



export default CardFavorite;
