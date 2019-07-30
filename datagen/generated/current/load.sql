LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:17:16/owner.csv' INTO TABLE owner FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (person_id, house_id);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:17:16/neighbor.csv' INTO TABLE neighbor FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (pida, pidb);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:17:16/house.csv' INTO TABLE house FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, style, constructed, purchased, bedrooms, bathrooms, sqft, levels, value, address);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:17:16/job.csv' INTO TABLE job FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, title, income, company, education);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:17:16/person.csv' INTO TABLE person FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, fname, lname, job, home);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:17:16/address.csv' INTO TABLE address FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, number, direction, streetName, suffix, unit, city, state, postalCode);
