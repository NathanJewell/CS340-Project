-- Molly
DROP TABLE IF EXISTS neighbor;

CREATE TABLE neighbor(
person_1_id INT DEFAULT NULL,
person_2_id INT DEFAULT NULL,
CONSTRAINT `person_1_id_fk`
	FOREIGN KEY (person_1_id) REFERENCES person(id)
	ON DELETE SET NULL,
CONSTRAINT `person_2_id_fk`
	FOREIGN KEY (person_2_id) REFERENCES person(id)
	ON DELETE SET NULL
) ENGINE = InnoDB;