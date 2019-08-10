
SELECT np.id, np.fname, np.lname FROM neighbor N
INNER JOIN person np on np.id = N.pidb 
WHERE N.pida = (
    SELECT p.id FROM person p
    WHERE p.fname LIKE @fname
    AND p.lname like @lname
    ORDER BY p.fname LIMIT 1
)