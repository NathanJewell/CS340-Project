--given person name find id
SELECT * FROM person p INNER JOIN job j ON p.job = j.id WHERE p.fname LIKE @fname AND p.lname LIKE @lname AND j.education LIKE @education