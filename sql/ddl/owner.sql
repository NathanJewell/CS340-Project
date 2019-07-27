-- Molly
DROP TABLE IF EXISTS owner;

CREATE TABLE owner(
	person_id INT PRIMARY KEY NOT NULL,
	house_id INT NOT NULL,
	CONSTRAINT `person_id_fk`
		FOREIGN KEY (person_id) REFERENCES person (id)
		ON DELETE CASCADE,
	CONSTRAINT `house_id_fk`
		FOREIGN KEY (house_id) REFERENCES house (id)
		ON DELETE CASCADE
) ENGINE = InnoDB;