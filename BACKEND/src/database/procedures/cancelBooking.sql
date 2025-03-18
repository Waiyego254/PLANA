CREATE PROCEDURE cancelBooking
    @booking_id VARCHAR(255)
AS
BEGIN
    DELETE FROM Bookings
    WHERE booking_id = @booking_id
END
