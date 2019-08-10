--given person name find id
SELECT * FROM person p INNER JOIN job j ON p.job = j.id WHERE p.fname LIKE @first AND lname LIKE @last AND j.education LIKE @education