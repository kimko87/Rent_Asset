import React from 'react';

const Footer = () => {
  return (
    <p className="text-center bg-danger border-top pt-3">
      Rent_Asset &copy; {new Date().getFullYear()}
    </p>
  );
}

export default Footer;