-- Molly

-- given address info, find address id using subquery, then
-- use inner join to find the matching house, delete that house.
DELETE FROM house WHERE house.id = @id