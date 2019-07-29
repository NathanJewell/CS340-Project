-- Molly

-- given address info, find address id using subquery, then
-- use inner join to find the matching house, delete that house.
DELETE * FROM house H
INNER JOIN A
	ON H.address_id =
		(SELECT A.id FROM address A WHERE number LIKE '%' + @number_input + '%' 
 		AND streetName LIKE '%' + @streetName_input + '%' AND city LIKE '%' + 
 		@city_input + '%' AND postalCode LIKE '%' + @postalCode_input + '%' LIMIT 1); 