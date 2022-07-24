/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const RecipesContext = createContext({});

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  return (
    <RecipesContext.Provider
      value={{
        recipes,
        setRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}
