CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(255),
    @username VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Users(user_id, username, email, password)
    VALUES(@user_id, @username, @email, @password)
END