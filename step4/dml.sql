
-- Molly

-- given address info, find address id using subquery, then
-- use inner join to find the matching house, delete that house.
DELETE FROM house WHERE house.id = @id

-- Molly

-- given person info, find house id using subquery, then use inner
-- join to find the matching house, remove owner relationship
-- between the person and the house

DELETE FROM owner o WHERE o.person_id = @person_id AND o.house_id = @house_id

-- Molly

-- given address info, find address id using subquery, then use inner join
-- to select the matching house information for that address id
SELECT H.style, H.constructed, H.purchased, H.bedrooms, H.bathrooms, H.sqft,
	H.levels, H.house_value 
FROM house H
INNER JOIN A
	ON H.address_id = 
		(SELECT A.id FROM address A WHERE number LIKE '%' + @number_input + '%' 
 		AND streetName LIKE '%' + @streetName_input + '%' AND city LIKE '%' + 
 		@city_input + '%' AND postalCode LIKE '%' + @postalCode_input + '%' LIMIT 1);


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
    @house
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
	@person_1_id_input,
	@person_2_id_input	
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

--given person name find id
SELECT P.id FROM person P WHERE fname LIKE '%' + @first + '%' AND lname LIKE '%' + @last + '%' LIMIT 1;


--given person id select all neighbors
SELECT R.fname, R.lname, R.id FROM (SELECT N.ida FROM neighbor N WHERE N.idb == @ID) AS R INNER JOIN person P ON N.ida == P.id

--given person name find id
SELECT P.id FROM person P WHERE fname LIKE '%' + @first + '%' AND lname LIKE '%' + @last + '%'

SELECT P.id FROM person P INNER JOIN job J ON P.job == J.id WHERE P.title LIKE '%' + @title + '%' 

SELECT * FROM address a WHERE a.id = @id

SELECT * FROM address

SELECT * FROM house h WHERE h.id = @id

--Nathan
-- This is a comment
SELECT * FROM house -- this is an inline comment?

SELECT * FROM job j WHERE j.id = @id

SELECT * FROM job

SELECT p1.id AS id_a, p1.fname as fname_a, p2.fname as fname_b, p2.id as id_b
FROM neighbor n
INNER JOIN person p1 on p1.id = n.pida
INNER JOIN person p2 on p2.id = n.pidb


SELECT p.id, p.fname, p.lname, o.house_id FROM owner o
INNER JOIN person p ON o.person_id = p.id

SELECT * FROM person p WHERE p.id = @id

SELECT * FROM person

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

UPDATE house H 
SET H.style = @style, H.purchased = @purchased,
	H.bedrooms = @bedrooms, H.bathrooms = @bathrooms, H.sqft = 
	@sqft, H.levels = @levels, H.house= @house_value
WHERE H.id = @id
