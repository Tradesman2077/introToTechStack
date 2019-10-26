import React from 'react';
import { directive } from '@babel/types';
import RecipeContentsOne from './recipeContentsOne';
import RecipeContentsTwo from './recipeContentsTwo';
import RecipeContentsThree from './recipeContentsThree';

const Recipe = (props) => {
    return(
        <div class="flexbox-container">
            <RecipeContentsOne name = "Tomato and basil pasta"  />
            <RecipeContentsTwo name = "Tomato and basil pasta"  />
            <RecipeContentsThree name = "Tomato and basil pasta"  />
        </div>
    );
}

export default Recipe;