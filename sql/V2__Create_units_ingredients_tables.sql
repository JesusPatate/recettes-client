-- Units used to qualify ingredients' quantities
CREATE TABLE units (
	id SERIAL PRIMARY KEY,
	name text NOT NULL
);

-- Amounts of ingredients used in the recipes
CREATE TABLE ingredients (
	id SERIAL PRIMARY KEY,
	ingredient text NOT NULL,
	quantity smallint CONSTRAINT positive_quantity CHECK (quantity > 0),
	unit_id integer REFERENCES units
);

-- Matches recipes and amounts of ingredients
CREATE TABLE recipe_ingredient (
	recipe_id integer NOT NULL REFERENCES recipes,
	ingredient_id integer NOT NULL REFERENCES ingredients
);