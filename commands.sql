--list of useful postgresql commands here

psql -U postgres

CREATE DATABASE fullstacker;

\c fullstacker

create extension if not exists "uuid_ossp";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);


--fake data insert SINGLE QUOTATIONS
INSERT INTO users (user_name, user_email, user_password) VALUES ('agatha', 'ag55@gmail.com', 'nopassword');
INSERT INTO users (user_name, user_email, user_password) VALUES ('1', '1@1.com', '1');

--common command
SELECT * FROM users;

--will clear table
DELETE FROM employee;

-- heroku pg:psql -a haheha

--1@1.com 1   1@3.com 1   ag55@gmail.com nopassword