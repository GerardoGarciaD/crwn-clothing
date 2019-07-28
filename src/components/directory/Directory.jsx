import React, { Component } from "react";

import MenuItem from "../menuItem/MenuItem";

import { connect } from "react-redux";
import "./Directory.scss";
import { selectDirectorySections } from "../../redux/directory/DirectorySelectors";
import { createStructuredSelector } from "reselect";

function Directory({ sections }) {
  return (
    <div className="directory-menu">
      {sections.map(({ title, imageUrl, id, size }) => (
        <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
      ))}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
