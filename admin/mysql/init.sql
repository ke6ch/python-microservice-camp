USE admin;

TRUNCATE TABLE products_user;

DROP PROCEDURE IF EXISTS products_user_procedure;

DELIMITER //
CREATE PROCEDURE products_user_procedure(in x int)
BEGIN
  DECLARE i INT DEFAULT 0;
  WHILE i < x do
    SET i = i + 1;
    insert into products_user values (i);
  END WHILE;
END
//
DELIMITER ;

CALL products_user_procedure(100);
