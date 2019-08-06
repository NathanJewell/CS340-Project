
SELECT p.id, p.fname, p.lname, o.house_id FROM owner o
INNER JOIN person p ON o.person_id = p.id
