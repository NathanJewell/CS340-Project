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