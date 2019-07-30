--given person name find id
SELECT P.id FROM person P WHERE fname LIKE '%' + @first + '%' AND lname LIKE '%' + @last + '%' LIMIT 1;


--given person id select all neighbors
SELECT R.fname, R.lname, R.id FROM (SELECT N.ida FROM neighbor N WHERE N.idb == @ID) AS R INNER JOIN person P ON N.ida == P.id
