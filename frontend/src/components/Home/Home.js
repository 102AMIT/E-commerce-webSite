import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import Product from "./Product.js";

const product = {
  name: "Nike Slim Shirt",
  images: [{ url: "https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?cs=srgb&dl=pexels-jeffrey-reed-769749.jpg&fm=jpg" }],
  price:"$120",
  _id:"amit",
}

const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />>
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
