import React from "react";
import "./CollectionsOverview.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../collectionPreview/CollectionPreview";
import { selectCollectionsForPreview } from "../../redux/shop/ShopSelectors";

function CollectionsOverview({ collections }) {
  return (
    <div className="collections-overview">
      {/* Se recorre la "variable u objeto" collection */}
      {/* Aqui se toman como parametros id, y se utiliza spread operator para
        pasar las demas propiedades de cada objeto que es recorrido */}
      {collections.map(({ id, ...otherCollectionProps }) => (
        // Se hace render al componente CollectionPreview y se mandan las props
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
