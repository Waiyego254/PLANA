CREATE OR ALTER PROCEDURE deactivateUser
    @user_id VARCHAR(255)
AS
BEGIN
    UPDATE Users SET isActive = 0 WHERE user_id = @user_id
END
