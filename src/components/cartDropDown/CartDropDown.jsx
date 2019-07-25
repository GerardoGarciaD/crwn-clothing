import React from "react";
import CustomButton from "../customButon/CustomButton";

import "./CartDropDown.scss";

export default function CartDropDown() {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <CustomButton>Go To Checkout</CustomButton>
    </div>
  );
}
