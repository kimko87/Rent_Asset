import React from 'react';
import "./searchbox.css";

const SearchBox = (props) => {
  return (
    <div className="center">
      <input type="search" className="search"
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default SearchBox;