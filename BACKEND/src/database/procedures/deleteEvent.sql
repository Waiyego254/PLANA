CREATE OR ALTER PROCEDURE deleteEvent
    @event_id VARCHAR(255)
AS
BEGIN
    DELETE FROM Events WHERE event_id = @event_id
END
