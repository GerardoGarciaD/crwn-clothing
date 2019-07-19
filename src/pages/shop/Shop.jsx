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
        {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    );
  }
}
