CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers(
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

-- INSERT INTO burgers (name) VALUES ("cheeseburger");