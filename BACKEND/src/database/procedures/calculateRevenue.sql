CREATE OR ALTER PROCEDURE getTotalRevenue
AS
BEGIN
    SELECT SUM(Events.price) AS totalRevenue
    FROM Bookings
    JOIN Events ON Bookings.event_id = Events.event_id;
END
