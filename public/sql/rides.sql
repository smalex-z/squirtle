CREATE TABLE rides (
    ride_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT,
    location VARCHAR(255),
    destination VARCHAR(255),
    departure_time DATETIME,
    max_capacity INT
    price INT
);
