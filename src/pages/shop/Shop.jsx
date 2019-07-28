import React from "react";

import CollectionsOverview from "../../components/collectionsOverview/CollectionsOverview";

export default function Shop({ collections }) {
  return (
    <div className="shop-page">
      <CollectionsOverview />
    </div>
  );
}
