import { createSelector } from "reselect";

// Se obtiene la pequeña parte del estado
const selectDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
  //   Se referencia al objeto que se obtiene del estado
  [selectDirectory],
  // para poder tener acceso a este otro objeto "directory"
  directory => directory.sections
);
