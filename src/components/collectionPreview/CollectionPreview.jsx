import React from "react";
import "./CollectionPreview.scss";

import CollectionItem from "../collectionItem/CollectionItem";

// Se hace destructuring de las props que se le pasan al componente
export default function CollectionPreview({ title, items }) {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items

          // Se filtran los items para para que solo se muestren los elementos con id menor a 4
          .filter((item, idx) => idx < 4)
          // Se hace un mapeo de los items con id menor  a 4, se obtienen- las propiedades a mandar
          .map(item => (
            // Se hace render al componente CollectionItem con las props obtenidas
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
