-- Molly
DROP TABLE IF EXISTS neighbor;

CREATE TABLE neighbor(
	person_1_id INT PRIMARY KEY NOT NULL,
	person_2_id INT NOT NULL,
	CONSTRAINT `person_1_id_fk`
		FOREIGN KEY (person_1_id) REFERENCES person(id)
		ON DELETE CASCADE,
	CONSTRAINT `person_2_id_fk`
		FOREIGN KEY (person_2_id) REFERENCES person(id)
		ON DELETE CASCADE
) ENGINE = InnoDB;