class Recipe {
    
    constructor(id, title, hot, dessert, servings, preparationTime, cookingTime = 0, source) {
        this.id = id;
        this.title = title;
        this.host = hot;
        this.dessert = dessert;
        this.servings = servings;
        this.preparationTime = preparationTime;
        this.cookingTime = cookingTime;
        this.source = source;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    isHot() {
        return this.hot;
    }

    isDessert() {
        return this.dessert;
    }

    getServings() {
        return this.servings;
    }

    getPreperationTime() {
        return this.preparationTime;
    }

    getCookingTime() {
        return this.cookingTime;
    }

    getSource() {
        return this.source;
    }
}

export default Recipe;