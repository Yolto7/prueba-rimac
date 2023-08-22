CREATE DATABASE example;

CREATE TABLE people (
  id_people serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  height INTEGER NOT NULL,
  mass INTEGER NOT NULL,
  hair_color VARCHAR(50) NOT NULL,
  skin_color VARCHAR(50) NOT NULL,
  eye_color VARCHAR(50) NOT NULL,
  birth_year VARCHAR(50) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);