import React from "react";
import "./CartItem.scss";

// Se hace destructuring de todo el item y a su vez de los elementos de ese item
export default function CartItem({
  item: { imageUrl, price, name, quantity }
}) {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="item" />

      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x $ {price}
        </span>
      </div>
    </div>
  );
}
