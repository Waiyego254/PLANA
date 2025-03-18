CREATE OR ALTER PROCEDURE bookEvent
    @booking_id VARCHAR(255),
    @user_id VARCHAR(255),
    @event_id VARCHAR(255)
AS
BEGIN
    -- Check if there are available tickets
    DECLARE @available_tickets INT;
    SELECT @available_tickets = available_tickets FROM Events WHERE event_id = @event_id;

    IF @available_tickets > 0
    BEGIN
        -- Proceed with booking
        INSERT INTO Bookings (booking_id, user_id, event_id, booking_date)
        VALUES (@booking_id, @user_id, @event_id, GETDATE());

        -- Reduce available tickets by 1
        UPDATE Events
        SET available_tickets = available_tickets - 1
        WHERE event_id = @event_id;

        -- Return booking details
        SELECT 
            Users.username,
            Events.title AS event_name
        FROM Bookings
        JOIN Users ON Bookings.user_id = Users.user_id
        JOIN Events ON Bookings.event_id = Events.event_id
        WHERE Bookings.booking_id = @booking_id;
    END
    ELSE
    BEGIN
        RAISERROR('Event is fully booked', 16, 1);
    END
END
