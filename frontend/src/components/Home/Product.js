import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


const Product = ({ product }) => {
  const options = {
    size: window.innerWidth < 600 ? 20 :25,
    value: product.rating,
    edit: false,
    activeColor: "tomato",
    isHalf: true,
    color : "rgba(20,20,20,0.1)",
};
  return (
    <Link to={`/product/${product._id}`} className="productCard">
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div className="productCard__rating">
        <ReactStars {...options} /> <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹ ${product.price}`}</span>
    </Link>
  );
};

export default Product;
