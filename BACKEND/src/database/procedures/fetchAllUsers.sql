CREATE OR ALTER PROCEDURE fetchAllUsers
AS
BEGIN
    
    SELECT username, email
    FROM Users;
END