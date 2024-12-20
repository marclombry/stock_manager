CREATE DATABASE stock_manager;

USE stock_manager;

CREATE TABLE stocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    location VARCHAR(255) NOT NULL
);
