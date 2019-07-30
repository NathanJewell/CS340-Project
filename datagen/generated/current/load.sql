LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:10:47/address.csv' INTO TABLE address FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, number, direction, streetName, suffix, unit, city, state, postalCode);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:10:47/owner.csv' INTO TABLE owner FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (person_id, house_id);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:10:47/job.csv' INTO TABLE job FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, title, income, company, education);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:10:47/person.csv' INTO TABLE person FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, fname, lname, job, home);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:10:47/house.csv' INTO TABLE house FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, style, constructed, purchased, bedrooms, bathrooms, sqft, levels, value, address);
LOAD DATA LOCAL INFILE './generated/output2019-07-29T20:10:47/neighbor.csv' INTO TABLE neighbor FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (pida, pidb);
