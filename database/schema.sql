CREATE DATABASE ai_threat_system;

USE ai_threat_system;


CREATE TABLE users (

    id INT PRIMARY KEY AUTO_INCREMENT,

    username VARCHAR(100),

    password VARCHAR(100)

);


INSERT INTO users (

    username,
    password

)

VALUES (

    'admin',
    'admin123'

);


CREATE TABLE threat_logs (

    id INT PRIMARY KEY AUTO_INCREMENT,

    node VARCHAR(100),

    threat_type VARCHAR(255),

    severity VARCHAR(50),

    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);