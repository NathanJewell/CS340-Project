
SELECT CONCAT(f.fname, ' ', f.lname) AS "ORIGIN", CONCAT(np.fname, ' ', np.lname) AS "NEIGHBOR", np.id FROM neighbor N
INNER JOIN person np on np.id = N.pidb INNER JOIN person f on f.id = N.pida
WHERE N.pida = (
    SELECT p.id FROM person p
    WHERE p.fname LIKE @fname
    AND p.lname like @lname
    ORDER BY p.fname LIMIT 1
)