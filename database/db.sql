-- Database
CREATE DATABASE contacts;
USE contacts;

-- Tables
CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL
);

CREATE TABLE contacts (
    id INT(12) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    number VARCHAR(9) NOT NULL,
    user VARCHAR(50) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user) REFERENCES users(username)
);

-- user test
INSERT INTO users(username, password, fullname) VALUES (
    'Test', '123456', 'Test test'
);