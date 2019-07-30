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
VALUES(
	@style_input,
	@constructed_input,
	@purchased_input,
	@bedrooms_input,
	@bathrooms_input,
	@sqft_input,
	@levels_input,
	@house_value_input,
	@address_id_input
);