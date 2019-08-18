import React from "react";
import "./Category.scss";
import { connect } from "react-redux";
import CollectionItem from "../../components/collectionItem/CollectionItem";
import { selectCollection } from "../../redux/shop/ShopSelectors";

// Se obtienen las props que se mandan desde el high order component
function CollectionPage({ collection }) {
  const { title, items } = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

// Aqui se mandan dos parametros ya que el primero es el state completo de la aplicacion
// y el segundo son las propiedades que recibe este componente en especifico
const mapStateToProps = (state, ownProps) => ({
  // Aqui se manda a llamar a la funcion(selector) selectCollection, en donde se se utiliza currying
  // para pasar los dos parametros, pero uno a la vez (ownProps.match.params.categoryId y el stado (state))
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
