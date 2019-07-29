--Nathan
--OG SPEC is mariadb

CREATE TABLE person (
    id INT UNSIGNED AUTO_INCREMENT,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    job INT UNSIGNED DEFAULT NULL
    home INT UNSIGNED DEFAULT NULL,
    CONSTRAINT `job_fk`
        FOREIGN KEY (job) REFERENCES job (id)
        ON DELETE SET NULL,
    CONSTRAINT `home_fk`
        FOREIGN KEY (home) REFERENCES house (id)
        ON DELETE SET NULL
    
) ENGINE = InnoDB;