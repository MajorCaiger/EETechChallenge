CREATE TABLE item (
  id INT unsigned auto_increment PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  isComplete tinyint NOT NULL DEFAULT 0
);
