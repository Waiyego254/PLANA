CREATE OR ALTER PROCEDURE updateUserCredentials(
    @user_id VARCHAR(255),
    @username VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
    UPDATE Users SET username=@username, email=@email, password=@password WHERE user_id=@user_id
END