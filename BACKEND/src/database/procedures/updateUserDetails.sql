CREATE OR ALTER PROCEDURE updateUserDetails(
    @email VARCHAR(100),
    @password VARCHAR(255)
)
AS
BEGIN
    UPDATE Users SET password=@password WHERE email=@email
END