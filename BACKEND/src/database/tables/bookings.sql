CREATE TABLE Bookings (
    booking_id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    event_id VARCHAR(255) NOT NULL,
    booking_date DATETIME DEFAULT GETDATE(),
    UNIQUE (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

SELECT * FROM Bookings


ALTER TABLE Bookings
DROP CONSTRAINT FK__Bookings__event___47DBAE45;


ALTER TABLE Bookings
ADD CONSTRAINT FK_Bookings_Events FOREIGN KEY (event_id)
REFERENCES Events(event_id) ON DELETE CASCADE;

