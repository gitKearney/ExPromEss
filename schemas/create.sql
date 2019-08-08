CREATE DATABASE demo;

USE demo;

-- create a user table
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  user_id CHAR(36) PRIMARY KEY,
  first_name VARCHAR(40) NOT NULL,
  last_name  VARCHAR(40) NOT NULL,
  upassword  VARCHAR(128) NOT NULL,
  email VARCHAR(64) NOT NULL,
  birthday DATE NOT NULL,
  roles ENUM('read', 'edit', 'create') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME NULL
) CHARACTER SET "utf8" COLLATE 'utf8_general_ci'
ENGINE=InnoDB;

DROP TABLE IF EXISTS products;
CREATE TABLE products
(
  product_id CHAR(36) PRIMARY KEY,
  title VARCHAR(32) NOT NULL,
  price FLOAT NOT NULL DEFAULT 0.00,
  quantity INTEGER UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME NULL
) ENGINE=InnoDB
CHARACTER SET "utf8" COLLATE 'utf8_general_ci';

DROP TABLE IF EXISTS people;
CREATE TABLE people
(
  user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(32) NOT NULL,
  last_name VARCHAR(32) NOT NULL
)  ENGINE="InnoDB" CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

-- ENGINE="InnoDB" CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';
-- ENGINE="InnoDB" CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci';

INSERT INTO people VALUES (1, 'Þðæ', 'haaß');
INSERT INTO people VALUES (2, 'åç', 'Ærø');
INSERT INTO people VALUES (3, 'カタカナ', 'マユコ');