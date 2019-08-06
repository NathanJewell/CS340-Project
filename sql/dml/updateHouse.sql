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