import React, { Component } from "react";

import CollectionPreview from "../../components/collectionPreview/CollectionPreview";

import SHOP_DATA from "./ShopData";

export default class Shop extends Component {
  constructor(props) {
    super(props);

    // Se guarda la informacion de los productos
    this.state = {
      collections: SHOP_DATA
    };
  }

  render() {
    // Se crea una varible y se hace destructuring del estado
    const { collections } = this.state;

    return (
      <div className="shop-page">
        {/* Se recorre la "variable u objeto" collection */}
        Aqui se toman como parametros id, y se utiliza spread operator para
        pasar las demas propiedades de
        {/* cada objeto que es recorrido */}
        {collections.map(({ id, ...otherCollectionProps }) => (
          // Se hace render al componente CollectionPreview y se mandan las props
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    );
  }
}
