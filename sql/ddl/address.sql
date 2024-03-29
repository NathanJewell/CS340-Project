--Nathan
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
    postalCode INT UNSIGNED NOT NULL
) ENGINE = innodb
