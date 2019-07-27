-- Molly
DROP TABLE IF EXISTS owner;

CREATE TABLE owner(
	person_id INT DEFAULT NULL,
	house_id INT DEFAULT NULL,
	CONSTRAINT `person_id_fk`
		FOREIGN KEY (person_id) REFERENCES person (id)
		ON DELETE SET NULL,
	CONSTRAINT `house_id_fk`
		FOREIGN KEY (house_id) REFERENCES house (id)
		ON DELETE SET NULL
) ENGINE = InnoDB;