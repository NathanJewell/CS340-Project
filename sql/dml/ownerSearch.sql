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