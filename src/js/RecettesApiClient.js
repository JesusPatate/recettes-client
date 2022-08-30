import axios from 'axios';
import Recipe from '@/js/Recipe.js';

const r1 = new Recipe('4a32880d-5637-4459-adad-df25cfc751c5', 'Fregola sarda, tomates, lardons et petits pois', true, false, 4, 10, 23, 'Thermomix express');
const r2 = new Recipe('34dad329-5dbb-4888-89f8-fb1f1435a4c2', 'Parmentier de poulet, ricotta et noisettes', true, false, 4, 20, 29, 'Cookeo saisons');

const recipes = new Map();
recipes.set(r1.getId(), r1);
recipes.set(r2.getId(), r2);

export default {
    getRecipes() {
        return recipes;
    },

    getRecipe(id) {
        return recipes.get(id);
    }
}