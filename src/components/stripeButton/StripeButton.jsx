import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default function StripeButton({ price }) {
  // Se convierte el total a centavos ya que de esta forma lo requiere la libreria Stripe
  const priceForStripe = price * 100;

  const publishableKey = "pk_test_qg3LwnPAVUtOq2HAjBMMlsUm00Phi5t7B3";

  //   Este token es el que se ocupa para crear cargos de verdad, en este caso solo se hace un console log ya que no
  //   se procesará ningun pago real
  const onToken = token => {
    console.log(token);
    alert("Payment Succesful");
  };
  return (
    //   Se manda a llamar al componente StripeCheckout en donde se pasan todas estas props
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}
