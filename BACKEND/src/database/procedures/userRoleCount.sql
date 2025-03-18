CREATE OR ALTER PROCEDURE getUserRolesCount
AS
BEGIN
    SELECT role AS userRole, COUNT(*) AS roleCount
    FROM Users
    GROUP BY role;
END;
