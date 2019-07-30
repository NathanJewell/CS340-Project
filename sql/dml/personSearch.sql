--given person name find id
SELECT P.id FROM person P WHERE fname LIKE '%' + @first + '%' AND lname LIKE '%' + @last + '%'

SELECT P.id FROM person P INNER JOIN job J ON P.job == J.id WHERE P.title LIKE '%' + @title + '%' 