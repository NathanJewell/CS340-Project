-- Molly

-- given person info, find house id using subquery, then use inner
-- join to find the matching house, remove owner relationship
-- between the person and the house

DELETE FROM owner WHERE person_id = @person_id AND house_id = @house_id