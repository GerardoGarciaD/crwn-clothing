import React from "react";
import "./CollectionItem.scss";
import CustomButton from "../customButon/CustomButton";

// Se hace destructuring a las props que son mandadas a este componente
export default function CollectionItem({ id, name, price, imageUrl }) {
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton inverted> Add To Cart</CustomButton>
    </div>
  );
}
