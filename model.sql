DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name TEXT NOT NULL,
    genre TEXT NOT NULL,
    monthly_listeners INTEGER NOT NULL
);

CREATE TABLE albums (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_name TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    number_of_listens INTEGER NOT NULL,
    artist_id INTEGER NOT NULL,
    FOREIGN KEY (artist_id)
        REFERENCES artists(artist_id)
        ON DELETE CASCADE
);

CREATE TABLE songs (
    song_id INTEGER PRIMARY KEY AUTOINCREMENT,
    song_name TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    album_id INTEGER NOT NULL,
    FOREIGN KEY (album_id)
        REFERENCES albums(album_id)
        ON DELETE CASCADE
);

INSERT INTO artists (artist_name, genre, monthly_listeners)
VALUES
('Taylor Swift', 'Pop', 105000000),
('Drake', 'Hip-Hop', 85000000);

INSERT INTO albums (album_name, release_year, number_of_listens, artist_id)
VALUES
('1989', 2014, 900000000, 1),
('Midnights', 2022, 750000000, 1),
('Scorpion', 2018, 800000000, 2),
('Views', 2016, 700000000, 2),
('Take Care', 2011, 650000000, 2);

INSERT INTO songs (song_name, release_year, album_id)
VALUES
('Blank Space', 2014, 1),
('Shake It Off', 2014, 1),
('Anti-Hero', 2022, 2),
('Lavender Haze', 2022, 2),
('God''s Plan', 2018, 3),
('In My Feelings', 2018, 3),
('Hotline Bling', 2016, 4),
('One Dance', 2016, 4),
('Marvins Room', 2011, 5),
('Headlines', 2011, 5);