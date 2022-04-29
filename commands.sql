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

INSERT INTO users (user_name, user_email, user_password) VALUES ('1', '1@1.com', '1');

SELECT * FROM users;

--will clear table
DELETE FROM employee;

--ACCESS HerouPOO DATABASE
-- heroku pg:psql -a haheha

--THESE WORK ON MY DB ON HerouPOO
--1@1.com 1   
--1@3.com 1   
--ag55@gmail.com nopassword 
--55@55.com  55