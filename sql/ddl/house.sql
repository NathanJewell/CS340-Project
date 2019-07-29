-- Molly
DROP TABLE IF EXISTS house;

CREATE TABLE house(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
	style VARCHAR(255) NOT NULL,
	constructed YEAR(4) NOT NULL,
	purchased YEAR(4) NOT NULL,
	bedrooms INT UNSIGNED NOT NULL,
	bathrooms INT UNSIGNED NOT NULL,
	sqft INT UNSIGNED NOT NULL,
	levels INT UNSIGNED NOT NULL,
	house_value INT UNSIGNED NOT NULL, -- value is an sql keyword so changed to house_value
	address_id INT DEFAULT NULL,
	CONSTRAINT `address_id_fk`
		FOREIGN KEY (address_id) REFERENCES address (id)
		ON DELETE SET NULL
) ENGINE=InnoDB;