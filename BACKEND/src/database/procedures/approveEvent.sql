CREATE OR ALTER PROCEDURE approveEvent
    @event_id VARCHAR(255)
AS
BEGIN
    UPDATE Events
    SET isApproved = 1
    WHERE event_id = @event_id;
END
