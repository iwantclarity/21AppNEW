CREATE DATABASE 21_db;

USE 21_db;

CREATE TABLE skills(
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    createdAt DATE,
    updatedAt DATE,
    PRIMARY KEY (id)
);

CREATE TABLE habits(
    id int NOT NULL AUTO_INCREMENT,
    habit_type varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE log(
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    updatedAt DATE,
    PRIMARY KEY (id)
);

CREATE TABLE `users_table` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username` (`username`)
);