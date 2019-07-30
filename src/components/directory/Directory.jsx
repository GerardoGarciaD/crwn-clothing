import React from "react";

import MenuItem from "../menuItem/MenuItem";

import { connect } from "react-redux";
import "./Directory.scss";
import { selectDirectorySections } from "../../redux/directory/DirectorySelectors";
import { createStructuredSelector } from "reselect";

function Directory({ sections }) {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
