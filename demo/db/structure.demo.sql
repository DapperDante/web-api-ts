-- Active: 1744844169817@@127.0.0.1@3306@demo
CREATE TABLE IF NOT EXISTS Users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(254) NOT NULL,
  password VARCHAR(100) NOT NULL,
  inactive DATETIME DEFAULT NULL,
  PRIMARY KEY(id)
);
CREATE UNIQUE INDEX idx_users_email ON Users(email);
CREATE UNIQUE INDEX idx_users_username ON Users(username);

CREATE TABLE IF NOT EXISTS Products (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  price DECIMAL(10, 2) NOT NULL,
  inactive DATETIME DEFAULT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE
);
CREATE INDEX idx_products_name ON Products(name);