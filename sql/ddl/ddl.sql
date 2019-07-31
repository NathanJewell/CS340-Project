-- Molly

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
	address_id INT UNSIGNED DEFAULT NULL,
	CONSTRAINT `address_id_fk`
		FOREIGN KEY (address_id) REFERENCES address (id)
		ON DELETE SET NULL
) ENGINE=InnoDB;-- Molly
DROP TABLE IF EXISTS owner;

CREATE TABLE owner(
	person_id INT UNSIGNED NOT NULL,
	house_id INT UNSIGNED NOT NULL,
	CONSTRAINT `person_id_fk`
		FOREIGN KEY (person_id) REFERENCES person (id)
		ON DELETE CASCADE,
	CONSTRAINT `house_id_fk`
		FOREIGN KEY (house_id) REFERENCES house (id)
		ON DELETE CASCADE,
	CONSTRAINT `pk_owner` PRIMARY KEY (person_id, house_id)
) ENGINE = InnoDB;-- Molly
DROP TABLE IF EXISTS neighbor;

CREATE TABLE neighbor(
	pida INT UNSIGNED NOT NULL,
	pidb INT UNSIGNED NOT NULL,
	CONSTRAINT `person_1_id_fk`
		FOREIGN KEY (pida) REFERENCES person(id)
		ON DELETE CASCADE,
	CONSTRAINT `person_2_id_fk`
		FOREIGN KEY (pidb) REFERENCES person(id)
		ON DELETE CASCADE,
	CONSTRAINT `pk_neighbor` PRIMARY KEY (pida, pidb)
) ENGINE = InnoDB;--Nathan
--OG SPEC is mariadb

CREATE TABLE person (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    job INT UNSIGNED DEFAULT NULL,
    home INT UNSIGNED DEFAULT NULL,
    CONSTRAINT `job_fk`
        FOREIGN KEY (job) REFERENCES job (id)
        ON DELETE SET NULL,
    CONSTRAINT `home_fk`
        FOREIGN KEY (home) REFERENCES house (id)
        ON DELETE SET NULL
    
) ENGINE = InnoDB;--Nathan
--OG SPEC is mariadb

CREATE TABLE address (
    id INT UNSIGNED PRIMARY KEY,
    number MEDIUMINT UNSIGNED NOT NULL,
    direction VARCHAR(2) DEFAULT NULL,
    streetName VARCHAR(63) NOT NULL,
    suffix VARCHAR(15) DEFAULT NULL,
    unit SMALLINT UNSIGNED DEFAULT NULL,
    city VARCHAR(127) NOT NULL,
    state VARCHAR(127) NOT NULL,
    postalCode INT UNSIGNED NOT NULL,
    house INT UNSIGNED DEFAULT NULL
) ENGINE = innodb

--Nathan
--OG SPEC is mariadb

CREATE TABLE job (
    id INT UNSIGNED PRIMARY KEY,
    title VARCHAR(63) NOT NULL,
    income INT UNSIGNED DEFAULT 0,
    company VARCHAR(127) NOT NULL,
    education VARCHAR(63) DEFAULT NULL
) ENGINE=innodb