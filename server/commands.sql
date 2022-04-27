psql -U postgres
\c fullstacker

CREATE DATABASE fullstacker;

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

--common command
SELECT * FROM users;