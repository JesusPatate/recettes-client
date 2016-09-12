CREATE TYPE courseType AS ENUM ('hot', 'cold');

-- Information specific to the recipes and the corresponding courses
CREATE TABLE recipes (
	id SERIAL PRIMARY KEY,
	title text,
	type courseType,
	dessert boolean,
	preparation smallint CONSTRAINT positive_preparation CHECK (preparation > 0),
	cooking smallint CONSTRAINT positive_cooking CHECK (cooking > 0)
);

