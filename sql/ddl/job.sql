--Nathan
--OG SPEC is mariadb

CREATE TABLE job (
    id INT UNSIGNED PRIMARY KEY,
    title VARCHAR(63) NOT NULL,
    income INT UNSIGNED DEFAULT 0,
    company VARCHAR(127) NOT NULL,
    education VARCHAR(63) DEFAULT NULL,
) ENGINE = innodb