import React from "react";
// Se obtiene la funcion para conectar y crear high order components
import { connect } from "react-redux";

import "./CollectionItem.scss";
import CustomButton from "../customButon/CustomButton";

// Se importa la accion para añadir elementos al carrito que se utiliza en mapDispatchToProps
import { addItem } from "../../redux/cart/CartActions";

// Se hace destructuring a las props que son mandadas a este componente
function CollectionItem({ item, addItem }) {
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      {/* Se manda a llamar la funcion que se obtiene de las props (mapDispatchToProps)  y se manda como parametro item*/}
      <CustomButton onClick={() => addItem(item)} inverted>
        Add To Cart
      </CustomButton>
    </div>
  );
}

// Se crea estra variable que consta se iguala una funcion con el parametro (dispatch)
const mapDispatchToProps = dispatch => ({
  // esto regresa "addItem" que recibe como parametro un item y que
  // a su vez crea una funcion en donde dispatch espera la accion, se llama a la accion add item
  // con el el parametro item
  // este addItem es la accion que se importa de Cart CartActions
  // el addItems que se regresa es el que se utiliza en el componente
  addItem: item => dispatch(addItem(item))
});

// Se exporta el high order component  y a su vez el mapDispatchToProps que contiene la accion
export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);
