CREATE TABLE inventory (
	prod_id serial PRIMARY KEY,
	manufact_id VARCHAR (50) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
	last_updated TIMESTAMP,
	description TEXT NOT NULL,
	manufact_cost NUMERIC NOT NULL,
	company_cost NUMERIC NOT NULL
);