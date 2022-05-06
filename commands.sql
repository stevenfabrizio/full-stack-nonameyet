--list of useful postgresql commands here.

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

--heroku login
--heroku create wiki-trans-test
--heroku addons:create heroku-postgresql:hobby-dev -a wiki-trans-test

--heroku pg:psql -a wiki-trans-test
--\dt;  why not

--DO TABLE CREATE STUFF
--\q to quit

--git add .
--git commit -m 'whatever'
--heroku git:remove -a wiki-trans-test
--git add .
--git commit -am 'make it better'
--git push heroku master



--heroku login
--heroku create X
--heroku addons:create heroku-postgresql:hobby-dev -a X
--heroku pg:psql -a X
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);
--heroku git:remote -a wikipedia-translator
--git add .
--git commit -am "make it better"
--git push heroku master

