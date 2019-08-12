DELETE FROM address WHERE address.id = @id
-- Molly

-- given address info, find address id using subquery, then
-- use inner join to find the matching house, delete that house.
DELETE FROM house WHERE house.id = @id
DELETE FROM job WHERE job.id = @id
-- Molly

-- given person info, find house id using subquery, then use inner
-- join to find the matching house, remove owner relationship
-- between the person and the house

DELETE FROM owner WHERE person_id = @person_id AND house_id = @house_id
DELETE FROM person WHERE person.id = @id
SELECT j.education FROM job j GROUP BY j.education ORDER BY j.education

INSERT INTO address (
    number,
    direction,
    streetName,
    suffix,
    unit,
    city,
    state,
    postalCode,
    house
)
VALUES (
    @number,
    @direction,
    @streetName,
    @suffix,
    @unit,
    @city,
    @state,
    @postalCode,
    NULL
)
-- Molly

-- insert a new house
INSERT INTO house(
	style,
	constructed,
	purchased,
	bedrooms,
	bathrooms,
	sqft,
	levels,
	house_value,
	address_id
)
VALUES (
	@style,
	@constructed,
	@purchased,
	@bedrooms,
	@bathrooms,
	@sqft,
	@levels,
	@house_value,
	@address_id
);
INSERT INTO job (
    title,
    income,
    company,
    education
)
VALUES (
    @title,
    @income,
    @company,
    @education
)
-- Molly

-- insert a new neighbor
INSERT INTO neighbor(
	pida,
	pidb	
)
VALUES(
	@person_1_id,
	@person_2_id
);
-- Molly

-- insert a new owner
INSERT INTO owner(
	person_id,
	house_id
)
VALUES(
	@person_id,
	@house_id
);

INSERT INTO person (
    fname,
    lname,
    job,
    home
)
VALUES (
    @fname,
    @lname,
    @job,
    @home
)

SELECT CONCAT(f.fname, ' ', f.lname) AS "ORIGIN", CONCAT(np.fname, ' ', np.lname) AS "NEIGHBOR", np.id FROM neighbor N
INNER JOIN person np on np.id = N.pidb INNER JOIN person f on f.id = N.pida
WHERE N.pida = (
    SELECT p.id FROM person p
    WHERE p.fname LIKE @fname
    AND p.lname like @lname
    ORDER BY p.fname LIMIT 1
)
-- Molly

-- given address info, find address id using subquery, then use inner join
-- to select the matching house information for that address id
--SELECT H.style, H.constructed, H.purchased, H.bedrooms, H.bathrooms, H.sqft,
	--H.levels, H.house_value 
--FROM house H
--INNER JOIN A
	--ON H.address_id = 
		--(SELECT A.id FROM address A WHERE number LIKE '%' + @number_input + '%' 
 		--AND streetName LIKE '%' + @streetName_input + '%' AND city LIKE '%' + 
 		--@city_input + '%' AND postalCode LIKE '%' + @postalCode_input + '%' LIMIT 1);
SELECT p.fname, p.lname, p.id FROM owner o INNER JOIN person p ON p.id = o.person_id WHERE o.house_id = @houseid
--given person name find id
SELECT CONCAT(p.fname, ' ', p.lname) as "NAME", job, home, j.* FROM person p LEFT JOIN job j ON p.job = j.id WHERE p.fname LIKE @fname AND p.lname LIKE @lname AND COALESCE(j.education, '') LIKE @education
SELECT * FROM address
SELECT * FROM address a WHERE a.id = @id
--Nathan
-- This is a comment
SELECT * FROM house -- this is an inline comment?
SELECT * FROM house h WHERE h.id = @id
SELECT * FROM job
SELECT * FROM job j WHERE j.id = @id
SELECT p1.id AS id_a, p1.fname as fname_a, p2.fname as fname_b, p2.id as id_b
FROM neighbor n
INNER JOIN person p1 on p1.id = n.pida
INNER JOIN person p2 on p2.id = n.pidb

SELECT p.id, p.fname, p.lname, o.house_id FROM owner o
INNER JOIN person p ON o.person_id = p.id

SELECT * FROM person
SELECT * FROM person p WHERE p.id = @id
SELECT * FROM owner o WHERE o.house_id = @house_id AND o.person_id = @person_id
UPDATE address SET
number = @number,
direction = @direction,
streetName = @streetName,
suffix = @suffix,
unit = @unit,
city = @city,
state = @state,
postalCode = @postalCode
WHERE id = @id
-- Molly

-- update the changeable house parameters for a given address (but won't change the 
-- fixed house parameters like year constructed or address).
--UPDATE H SET H.style = @style_input, H.purchased = @purchased_input,
	--H.bedrooms = @bedrooms_input, H.bathrooms = @bathrooms_input, H.sqft = 
	--@sqft_input, H.levels = @levels_input, H.house_value = @house_value_input
--FROM house H
--INNER JOIN A
	--ON H.address_id = (SELECT A.id FROM address A WHERE number LIKE '%' + @number_input + '%' 
 		--AND streetName LIKE '%' + @streetName_input + '%' AND city LIKE '%' + 
 		--@city_input + '%' AND postalCode LIKE '%' + @postalCode_input + '%' LIMIT 1); 

UPDATE house
SET style = @style, purchased = @purchased,
	bedrooms = @bedrooms, bathrooms = @bathrooms, sqft = @sqft,
	levels = @levels, house_value = @house_value
WHERE id = @id
UPDATE job SET
title = @title,
income = @income,
company = @company,
education = @education
WHERE id = @id
UPDATE person SET
fname = @fname,
lname = @lname,
job = @job,
home = @home
WHERE id = @id
