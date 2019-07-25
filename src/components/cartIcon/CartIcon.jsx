import React from "react";

// Se importa el icono
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./CartIcon.scss";

export default function CartIcon() {
  return (
    <div className="cart-icon">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}
