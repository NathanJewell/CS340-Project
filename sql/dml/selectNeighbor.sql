SELECT p1.id AS id_a, p1.fname as fname_a, p2.fname as fname_b, p2.id as id_b
FROM neighbor n
INNER JOIN person p1 on p1.id = n.pida
INNER JOIN person p2 on p2.id = n.pidb