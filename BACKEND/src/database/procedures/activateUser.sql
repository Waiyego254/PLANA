CREATE OR ALTER PROCEDURE activateUser
    @user_id VARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET isActive = 1
    WHERE user_id = @user_id
END
