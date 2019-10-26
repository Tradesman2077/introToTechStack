import React from 'react';
import './App.css';
import Recipe from './Recipe';
import recipe_data from './recipe_data/recipe_data.json';
import RecipeContentsOne from './recipeContentsOne';
import RecipeContentsTwo from './recipeContentsTwo';
import RecipeContentsThree from './recipeContentsThree';

function App() {
  return (
    <div className="App">
      <h1>LTU cook</h1>
      <Recipe /> 
      <Recipe />
      <Recipe />
      
      
      
      
    </div>
  );
}

export default App;
