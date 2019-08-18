import React from "react";

// se importa el styled component
import { HomePageContainer } from "./HomePageStyles";

import Directory from "../../components/directory/Directory";

export default function HomePage() {
  return (
    <HomePageContainer className="homepage">
      <Directory />
    </HomePageContainer>
  );
}
