-- Molly

-- given person info, find house id using subquery, then use inner
-- join to find the matching house, remove owner relationship
-- between the person and the house

DELETE * FROM owner
INNER JOIN P
	ON O.person_id = 
		(SELECT P.id FROM person P WHERE fname LIKE '%' + @first +
		'%' AND lname LIKE '%' + @last + '%' LIMIT 1);