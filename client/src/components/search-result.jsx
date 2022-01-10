import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ addToFavorites, filteredAsset, card, user }) => {
  console.log(user);
  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
      <div className="card ">
        <img
          className="card-img-top "
          src={filteredAsset.assetImage}
          width=""
          alt={filteredAsset.assetName}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{filteredAsset.assetName}</h5>
          <p className="card-text">{filteredAsset.assetDescription}</p>
          <p className="card-text border-top pt-2">
            <b>Tel: </b>
            {filteredAsset.assetPhone}
            <br />
            <b>Address: </b>
            {filteredAsset.assetAddress}
          </p>
          <p>
            <i className="far fa-heart text-danger me-2"></i>
            <Link to="#" className="text-danger" onClick={() => addToFavorites(filteredAsset._id, user._id)}>Add to favorites</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;