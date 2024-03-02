CREATE TABLE users(
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE objects(
    object_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    object_name VARCHAR(255) NOT NULL,
    object_url VARCHAR(500) NOT NULL
);

CREATE TABLE matches(
    match_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    object_id INT NOT NULL,
    host_id INT NOT NULL,
    match_date TIMESTAMP WITH TIME ZONE NOT NULL,
    match_name VARCHAR(255) NOT NULL,
    match_code VARCHAR(6),
    num_players INT NOT NULL,
    CONSTRAINT fk_object
        FOREIGN KEY(object_id)
            REFERENCES objects(object_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_host
        FOREIGN KEY(host_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);

CREATE TABLE users_in_matches(
    user_id INT NOT NULL,
    match_id INT NOT NULL,
    completed BOOLEAN,
    PRIMARY KEY (user_id, match_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_match
        FOREIGN KEY(match_id)
            REFERENCES matches(match_id)
            ON DELETE CASCADE
);

INSERT INTO objects (object_name, object_url)
VALUES ('Centrum Futbolu Warszawianka', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.633361730215!2d21.0286193!3d52.1955368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd2c5af8a69d%3A0xac0bf18a2c4f2ae6!2sCentrum%20Futbolu%20Warszawianka!5e0!3m2!1spl!2spl!4v1707303455651!5m2!1spl!2spl');

INSERT INTO objects (object_name, object_url)
VALUES ('Orlik Wilanów', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39130.13361162108!2d21.028619!3d52.195536999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47192d65d9ec1cdf%3A0xe93bf54b80c903a6!2sOrlik%20Wilan%C3%B3w%20Warszawa!5e0!3m2!1spl!2spl!4v1707077716646!5m2!1spl!2spl');

INSERT INTO objects (object_name, object_url)
VALUES ('Orlik przy SP nr 264, Ochota','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.1897913869725!2d20.97114406526978!3d52.20359841878103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd6eef8d02ed%3A0x79549a36e3d4330a!2sStadion%20Phoenix!5e0!3m2!1spl!2spl!4v1707303565318!5m2!1spl!2spl');