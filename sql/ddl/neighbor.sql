-- Molly
DROP TABLE IF EXISTS neighbor;

CREATE TABLE neighbor(
	pida INT UNSIGNED NOT NULL,
	pidb INT UNSIGNED NOT NULL,
	CONSTRAINT `person_1_id_fk`
		FOREIGN KEY (pida) REFERENCES person(id)
		ON DELETE CASCADE,
	CONSTRAINT `person_2_id_fk`
		FOREIGN KEY (pidb) REFERENCES person(id)
		ON DELETE CASCADE
	CONSTRAINT `pk_neighbor` PRIMARY KEY (pida, pidb)
) ENGINE = InnoDB;