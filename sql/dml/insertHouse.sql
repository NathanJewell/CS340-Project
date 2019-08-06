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